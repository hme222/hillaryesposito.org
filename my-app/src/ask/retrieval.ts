// Small BM25 retrieval over the approved knowledge passages.
//
// Runs in the browser, costs nothing, and is the answer of record: the AI
// layer only ever writes from what this returns. No dependency — the corpus
// is a few hundred short passages, so a hand-rolled index is both smaller
// and easier to reason about than a search library.
//
// Pipeline: lowercase → fold accents → split → drop EN/ES stopwords → light
// stem. Query terms are expanded with a tight synonym table and with vocabulary
// terms that share a 5+ character prefix (covers EN/ES morphology without a
// real stemmer). A question is "covered" when the top passage scores above a
// floor AND the query's weighted terms are mostly present in it (grounding).

import type { AskLang, KnowledgeEntry } from "./types";

// ── Normalisation ──────────────────────────────────────────────────────────

export function fold(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

const STOPWORDS = new Set<string>(
  (
    // English
    "a an the and or of to in on at for with by from as is are was were be been being " +
    "do does did done has have had having it its this that these those she her hers he " +
    "his they them their i me my we our you your what which who whom how when where why " +
    "there here about into than then so if not no yes can could would should will may " +
    "might get got any some all more most much many also just very s t up out over " +
    "under while during tell us know about ever any one ones thing things use uses " +
    "used using handle handles handled manage manages managed deal " +
    // Spanish
    "el la los las un una unos unas de del al a en por para con sin sobre y o u e que " +
    "cual cuales quien quienes como cuando donde es son fue fueron era eran ser estar esta " +
    "estan hay ha han hizo hace hacer se su sus ella ellos lo le les mi mis tu tus no si " +
    "ya mas muy tambien pero este estos estas ese esa eso aqui alli usted cuanto cuanta " +
    "cuantos cuantas tiene tienen tuvo puede pueden cada todo toda todos todas algo " +
    "alguna algun sabe dime digame usa usar usan utiliza utilizan utilizo puedo podria " +
    "podemos podrian maneja manejar " +
    // Names (every passage is about her)
    "hillary esposito"
  ).split(/\s+/),
);

function stemEn(t: string): string {
  if (/^\d+$/.test(t)) return t;
  if (t.length > 4 && t.endsWith("ies")) t = t.slice(0, -3) + "y";
  else if (t.endsWith("sses")) t = t.slice(0, -2);
  else if (t.length > 3 && t.endsWith("s") && !t.endsWith("ss") && !t.endsWith("us") && !t.endsWith("is")) t = t.slice(0, -1);
  if (t.length > 5 && t.endsWith("ing")) t = t.slice(0, -3);
  else if (t.length > 4 && t.endsWith("ed")) t = t.slice(0, -2);
  if (t.length > 3 && /([^aeiou])\1$/.test(t)) t = t.slice(0, -1); // mapp → map
  if (t.length > 4 && t.endsWith("e")) t = t.slice(0, -1); // file/filing → fil
  return t;
}

function stemEs(t: string): string {
  if (/^\d+$/.test(t)) return t;
  if (t.length > 7 && t.endsWith("mente")) t = t.slice(0, -5);
  if (t.length > 5 && t.endsWith("es") && !/[aeiou]es$/.test(t)) t = t.slice(0, -2);
  else if (t.length > 4 && t.endsWith("s")) t = t.slice(0, -1);
  if (t.length > 4 && /[aeo]$/.test(t)) t = t.slice(0, -1); // planta/flujo → plant/fluj
  return t;
}

function stem(t: string, lang: AskLang): string {
  return lang === "es" ? stemEs(t) : stemEn(t);
}

export function tokenize(text: string, lang: AskLang): string[] {
  return fold(text)
    .replace(/['’`]s\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t))
    .map((t) => stem(t, lang))
    .filter((t) => t.length >= 2);
}

// ── Synonyms ───────────────────────────────────────────────────────────────
// Each group expands to the others. Expansions count toward "grounding", so
// keep groups to true aliases: a loose bridge turns an uncovered question into
// a confident wrong answer.

const SYNONYM_GROUPS: string[][] = [
  ["msk", "mskcc", "memorial sloan kettering", "sloan kettering"],
  ["emr", "ehr", "electronic medical record", "expediente medico electronico", "expediente electronico"],
  ["logistics", "logistica", "army", "military", "militar", "ejercito", "soldier", "soldado", "national guard", "guardia nacional", "iraq", "irak", "veteran", "veterana"],
  ["training", "trainer", "facilitator", "facilitadora", "facilitation", "facilitacion", "capacitacion", "capacitadora", "instructed", "instructor", "taught", "teach", "ensenar", "instruir", "entrenar"],
  ["survey", "surveyed", "encuesta", "encuestados", "encuesto"],
  ["plant", "planta", "houseplant"],
  ["built", "build", "builds", "building", "construido", "construida", "construir", "construyo", "made", "hecho"],
  ["resume", "cv", "curriculum", "curriculo"],
  ["email", "correo", "contact", "contacto", "mail", "reach"],
  ["education", "educacion", "degree", "degrees", "titulo", "master", "masters", "maestria", "mha", "rutgers", "university", "universidad", "estudio", "estudios", "studied"],
  ["credential", "credentials", "credencial", "certificate", "certificado", "certification", "certificacion", "green belt", "lean six sigma", "six sigma"],
  ["mobbin", "kikoff", "polymarket", "discover"],
  ["own", "owned", "ownership", "responsible", "responsibilities", "led", "lead", "initiated", "directed", "responsable", "dirigio", "lidero", "inicio", "encargo"],
  ["cost", "costs", "savings", "saved", "spending", "money", "budget", "costo", "costos", "gasto", "ahorro", "dinero"],
  ["hospital", "clinic", "clinical", "clinico", "clinica", "clinician", "clinicians", "healthcare", "salud", "cancer", "oncologica"],
  ["test", "testing", "tested", "usability", "prueba", "pruebas", "probar", "retest"],
  ["spanish", "espanol", "bilingual", "bilingue", "language", "languages", "idioma", "idiomas", "english", "ingles", "speak", "speaks", "spoken", "habla", "hablar"],
  ["faster", "quicker", "speed", "rapido", "rapida", "shorter", "reduced", "reduction", "reducido", "reduccion", "redujo", "cut"],
  ["cat", "gato", "gata", "luna", "pet", "pets", "mascota", "mascotas"],
  ["reading", "read", "book", "libro", "leyendo", "lee", "leer"],
  ["notification", "notifications", "notificacion", "notificaciones", "reminder", "reminders", "recordatorio", "recordatorios"],
  ["phase", "fase"],
  ["prototype", "prototipo", "demo"],
  ["tool", "tools", "herramienta", "herramientas", "software", "figma"],
  ["freelance", "contract", "contractor", "client", "cliente", "contrato"],
  ["location", "nyc", "york", "city", "ciudad", "based", "live", "lives", "vive", "reside"],
  ["stack", "tech", "technology", "tecnologia", "react", "typescript", "vercel", "site", "website", "sitio", "web", "portfolio", "portafolio", "storybook", "claude", "codex", "higgsfield"],
  ["role", "job", "position", "puesto", "cargo", "title", "seat"],
  ["years", "year", "anos", "ano", "experience", "experiencia", "long"],
  ["wrong", "mistake", "mistakes", "error", "errores", "misjudged", "fail", "failed", "equivoco", "equivocada"],
  ["room", "rooms", "habitacion", "cuarto", "grouped", "group", "agrupa", "agrupar"],
  ["color", "colour", "colors", "colores", "palette", "paleta", "token", "tokens"],
  ["name", "named", "naming", "label", "labeled", "labelled", "nombrar", "nombre", "etiqueta", "etiquetar"],
  ["delete", "deleted", "uninstall", "quit", "leave", "borrar", "eliminar", "abandonar"],
  // Batch 3 holds an approved inspiration quote (journey, collage, warm, style),
  // so these aliases now land on a real passage instead of inventing one.
  ["inspired", "inspiration", "inspire", "inspiro", "inspiracion", "look", "style", "estilo", "visual", "aesthetic", "estetica", "collage", "journey", "warm", "feel"],
  ["fair", "feria", "pitch", "pitched", "presented", "presento", "propuesta", "proposal"],
  ["ai", "ia", "artificial intelligence", "inteligencia artificial", "llm", "generative", "generativa", "emergent"],
];

function buildSynonyms(lang: AskLang): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  for (const group of SYNONYM_GROUPS) {
    const members = group.map((phrase) => tokenize(phrase, lang));
    const all = new Set(members.flat());
    for (const tokens of members) {
      for (const t of tokens) {
        const set = map.get(t) ?? new Set<string>();
        all.forEach((other) => {
          if (other !== t) set.add(other);
        });
        map.set(t, set);
      }
    }
  }
  return map;
}

// ── Index ──────────────────────────────────────────────────────────────────

type Doc = {
  entry: KnowledgeEntry;
  tf: Map<string, number>;
  length: number;
  /** Tokens in the passage text alone (the label is shared by its section). */
  textTokens: number;
};

export type AskIndex = {
  lang: AskLang;
  docs: Doc[];
  df: Map<string, number>;
  avgLength: number;
  vocab: string[];
  synonyms: Map<string, Set<string>>;
  /** Weight given to a query term the corpus has never seen (see grounding). */
  unknownWeight: number;
};

const LABEL_WEIGHT = 0.5;

export function buildIndex(entries: KnowledgeEntry[], lang: AskLang): AskIndex {
  const df = new Map<string, number>();
  const docs: Doc[] = entries.map((entry) => {
    const tf = new Map<string, number>();
    const add = (t: string, w: number) => tf.set(t, (tf.get(t) ?? 0) + w);
    // Passages carry their own language; labels and quotes may be English
    // inside the Spanish file, so stem by the entry's language.
    const textTokens = tokenize(entry.text, entry.lang);
    textTokens.forEach((t) => add(t, 1));
    tokenize(entry.source.label, lang).forEach((t) => add(t, LABEL_WEIGHT));
    let length = 0;
    tf.forEach((w, t) => {
      length += w;
      df.set(t, (df.get(t) ?? 0) + 1);
    });
    return { entry, tf, length, textTokens: textTokens.length };
  });
  const avgLength = docs.reduce((sum, d) => sum + d.length, 0) / Math.max(1, docs.length);
  const vocab = Array.from(df.keys());
  const n = docs.length;
  const idfOf = (d: number) => Math.log(1 + (n - d + 0.5) / (d + 0.5));
  // An unseen word ("speak", "faster") counts like an average vocabulary word,
  // not like the rarest one: otherwise one generic verb sinks a good match.
  const unknownWeight = vocab.length ? vocab.reduce((sum, t) => sum + idfOf(df.get(t) ?? 0), 0) / vocab.length : 1;
  return { lang, docs, df, avgLength, vocab, synonyms: buildSynonyms(lang), unknownWeight };
}

// ── Search ─────────────────────────────────────────────────────────────────

const K1 = 1.2;
// Low length normalisation on purpose: the long passages (résumé lines, quotes)
// are the richest answers, and standard b=0.75 buries them under fragments.
const B = 0.25;
const PREFIX_MIN = 5;
const EXPANSION_WEIGHT = 0.8;
const LEAD_BONUS = 1.08;
/** Passages under this many text tokens are labels or kickers, not sentences. */
const FRAGMENT_TOKENS = 6;
const FRAGMENT_PENALTY = 0.82;

export type SearchHit = { entry: KnowledgeEntry; score: number };

export type SearchResult = {
  /** Retrieval's own verdict: at least one passage answers this well enough to cite. */
  covered: boolean;
  hits: SearchHit[];
  /** Diagnostics, exposed for the eval and for tuning. */
  topScore: number;
  grounding: number;
  terms: string[];
};

export type SearchOptions = {
  limit?: number;
  minScore?: number;
  minGrounding?: number;
};

export const DEFAULT_MIN_SCORE = 1.0;
export const DEFAULT_MIN_GROUNDING = 0.55;

function idf(index: AskIndex, term: string): number {
  const n = index.docs.length;
  const d = index.df.get(term) ?? 0;
  return Math.log(1 + (n - d + 0.5) / (d + 0.5));
}

function expansions(index: AskIndex, term: string): Set<string> {
  const out = new Set<string>();
  index.synonyms.get(term)?.forEach((s) => out.add(s));
  if (term.length >= PREFIX_MIN) {
    for (const v of index.vocab) {
      if (v === term || v.length < PREFIX_MIN) continue;
      if (v.startsWith(term) || term.startsWith(v)) out.add(v);
    }
  }
  out.delete(term);
  return out;
}

export function search(index: AskIndex, query: string, options: SearchOptions = {}): SearchResult {
  const limit = options.limit ?? 8;
  const minScore = options.minScore ?? DEFAULT_MIN_SCORE;
  const minGrounding = options.minGrounding ?? DEFAULT_MIN_GROUNDING;

  const terms = Array.from(new Set(tokenize(query, index.lang)));
  if (!terms.length) return { covered: false, hits: [], topScore: 0, grounding: 0, terms };

  // Per query term: the term itself at full weight, its expansions discounted.
  const candidates = terms.map((term) => {
    const alts = new Map<string, number>();
    alts.set(term, 1);
    expansions(index, term).forEach((alt) => alts.set(alt, EXPANSION_WEIGHT));
    return { term, alts };
  });

  const scored = index.docs.map((doc) => {
    let score = 0;
    let coveredWeight = 0;
    let totalWeight = 0;
    for (const { term, alts } of candidates) {
      const termWeight = index.df.has(term) ? idf(index, term) : index.unknownWeight;
      totalWeight += termWeight;
      let best = 0;
      alts.forEach((weight, alt) => {
        const tf = doc.tf.get(alt);
        if (!tf) return;
        const norm = tf * (K1 + 1) / (tf + K1 * (1 - B + (B * doc.length) / index.avgLength));
        best = Math.max(best, weight * idf(index, alt) * norm);
      });
      if (best > 0) coveredWeight += termWeight;
      score += best;
    }
    // Editorial prior: the first passage of a section is its lead, so on a
    // near-tie ("What is Grove?") it should outrank a fragment from mid-section.
    if (score > 0 && /:0$/.test(doc.entry.id)) score *= LEAD_BONUS;
    // A kicker like "Service design · process improvement" matches every token
    // it has; a sentence that says what she did should still outrank it.
    if (score > 0 && doc.textTokens < FRAGMENT_TOKENS) score *= FRAGMENT_PENALTY;
    return { doc, score, grounding: totalWeight ? coveredWeight / totalWeight : 0 };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored[0];
  const hits = scored
    .filter((s) => s.score > 0)
    .slice(0, limit)
    .map((s) => ({ entry: s.doc.entry, score: s.score }));

  const covered = !!top && top.score >= minScore && top.grounding >= minGrounding;
  return { covered, hits, topScore: top?.score ?? 0, grounding: top?.grounding ?? 0, terms };
}

/** Distinct sources among the hits, in rank order — for "related" links. */
export function distinctSources(hits: SearchHit[], max = 3): KnowledgeEntry[] {
  const seen = new Set<string>();
  const out: KnowledgeEntry[] = [];
  for (const { entry } of hits) {
    const key = entry.source.url ?? entry.source.label;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(entry);
    if (out.length >= max) break;
  }
  return out;
}
