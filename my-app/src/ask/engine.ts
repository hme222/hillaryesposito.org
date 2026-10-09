// Lazy entry point for the browser: imported with import() when the dialog
// opens, so the index code and the knowledge JSON stay out of the main bundle.
import { buildIndex, distinctSources, search, type AskIndex } from "./retrieval";
import { loadKnowledge } from "./loadKnowledge";
import type { AskLang } from "./types";

const indexes: Partial<Record<AskLang, Promise<AskIndex>>> = {};

export function getIndex(lang: AskLang): Promise<AskIndex> {
  if (!indexes[lang]) indexes[lang] = loadKnowledge(lang).then((entries) => buildIndex(entries, lang));
  return indexes[lang] as Promise<AskIndex>;
}

export { search, distinctSources };
