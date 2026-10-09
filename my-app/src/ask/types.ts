// Shared shapes for the "Ask about the work" answer engine.
// The knowledge files (knowledge/en.json, knowledge/es.json) are the single
// source of truth: every passage is verbatim from the résumé, a published
// page, or an approved interview quote.

export type AskLang = "en" | "es";

export type KnowledgeSource = {
  /**
   * page: a published page (internal path + anchor, or an external page);
   * resume: the résumé PDF; interview-notes: third-person facts from her
   * interview, linked to the related case study; repo: the GitHub source;
   * interview-quote: her verbatim words, no link (label is the attribution).
   */
  type: "page" | "resume" | "interview-notes" | "repo" | "interview-quote";
  /** Human label, e.g. "MSK case study · One map made four departments see the same failure." */
  label: string;
  /** Internal path (with anchor), a PDF path, an external URL, or null for quotes. */
  url?: string | null;
};

export type KnowledgeEntry = {
  id: string;
  /** Language of the text itself; es.json may carry "en" quote entries. */
  lang: AskLang;
  text: string;
  source: KnowledgeSource;
  batch: number;
  /** Hillary's verbatim words: always rendered as a quotation, never paraphrased. */
  quote?: boolean;
};

export type KnowledgeFile = {
  version: number;
  note?: string;
  entries: KnowledgeEntry[];
};

/** What /api/ask returns. `fallback` means "show the passages you already have". */
export type AskApiResponse =
  | { covered: boolean; answer: string; citations: string[] }
  | { fallback: true };
