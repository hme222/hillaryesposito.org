import type { AskLang, KnowledgeEntry, KnowledgeFile } from "./types";

// Dynamic imports so the knowledge JSON ships as its own chunks and never
// enters the homepage bundle. Each language loads once per session.
const cache: Partial<Record<AskLang, Promise<KnowledgeEntry[]>>> = {};

export function loadKnowledge(lang: AskLang): Promise<KnowledgeEntry[]> {
  if (!cache[lang]) {
    cache[lang] = (lang === "es"
      ? import(/* webpackChunkName: "ask-knowledge-es" */ "./knowledge/es.json")
      : import(/* webpackChunkName: "ask-knowledge-en" */ "./knowledge/en.json")
    ).then((mod) => (mod.default as KnowledgeFile).entries);
  }
  return cache[lang] as Promise<KnowledgeEntry[]>;
}
