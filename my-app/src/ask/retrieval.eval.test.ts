import { buildIndex, search } from "./retrieval";
import type { AskLang, KnowledgeFile } from "./types";
import en from "./knowledge/en.json";
import es from "./knowledge/es.json";
import evalSet from "./eval.json";

type EvalQuestion = {
  id: string;
  audience: string;
  lang: AskLang;
  question: string;
  expect: string[] | "out_of_scope";
  note?: string;
  /** A documented homograph the lexical gate cannot refuse; the model gate handles it. */
  known_leak?: boolean;
};

const questions = (evalSet as { questions: EvalQuestion[] }).questions;
const indexes = {
  en: buildIndex((en as KnowledgeFile).entries, "en"),
  es: buildIndex((es as KnowledgeFile).entries, "es"),
};

function run(q: EvalQuestion) {
  const result = search(indexes[q.lang], q.question, { limit: 8 });
  const top3 = result.hits.slice(0, 3).map((h) => h.entry.id);
  return { result, top3 };
}

describe("ask retrieval eval", () => {
  const inScope = questions.filter((q) => q.expect !== "out_of_scope");
  const outOfScope = questions.filter((q) => q.expect === "out_of_scope");

  it("has a balanced set across audiences and languages", () => {
    expect(questions.length).toBeGreaterThanOrEqual(40);
    expect(questions.filter((q) => q.lang === "es").length).toBeGreaterThanOrEqual(12);
    expect(new Set(questions.map((q) => q.audience)).size).toBe(3);
    expect(outOfScope.length).toBeGreaterThanOrEqual(10);
  });

  it("puts an expected passage in the top 3 for at least 80% of in-scope questions, and marks them covered", () => {
    const misses: string[] = [];
    const notCovered: string[] = [];
    const groundings: string[] = [];
    for (const q of inScope) {
      const { result, top3 } = run(q);
      groundings.push(`${q.id} ${result.grounding.toFixed(2)}`);
      const hit = (q.expect as string[]).some((id) => top3.includes(id));
      if (!hit) misses.push(`${q.id} "${q.question}" → ${top3.join(", ")}`);
      if (!result.covered) notCovered.push(`${q.id} score=${result.topScore.toFixed(2)} grounding=${result.grounding.toFixed(2)}`);
    }
    const hitRate = (inScope.length - misses.length) / inScope.length;
    const coveredRate = (inScope.length - notCovered.length) / inScope.length;
    // eslint-disable-next-line no-console
    console.log(
      `ask eval · in-scope top-3 hit ${(hitRate * 100).toFixed(1)}% (${inScope.length - misses.length}/${inScope.length}) · covered ${(coveredRate * 100).toFixed(1)}%` +
        (misses.length ? `\n  misses:\n  ${misses.join("\n  ")}` : "") +
        (notCovered.length ? `\n  not covered:\n  ${notCovered.join("\n  ")}` : "") +
        `\n  lowest groundings: ${groundings.sort((a, b) => Number(a.split(" ")[1]) - Number(b.split(" ")[1])).slice(0, 8).join(", ")}`,
    );
    expect(hitRate).toBeGreaterThanOrEqual(0.8);
    expect(coveredRate).toBeGreaterThanOrEqual(0.8);
  });

  it("returns not covered for 100% of out-of-scope questions (known lexical leaks listed in eval.json are reported, and must not grow)", () => {
    const leaks: string[] = [];
    const knownLeaks: string[] = [];
    for (const q of outOfScope) {
      const { result, top3 } = run(q);
      if (!result.covered) continue;
      const line = `${q.id} "${q.question}" score=${result.topScore.toFixed(2)} grounding=${result.grounding.toFixed(2)} → ${top3.join(", ")}`;
      if (q.known_leak) knownLeaks.push(line);
      else leaks.push(line);
    }
    const strict = outOfScope.filter((q) => !q.known_leak);
    // eslint-disable-next-line no-console
    console.log(
      `ask eval · out-of-scope not-covered ${(((strict.length - leaks.length) / strict.length) * 100).toFixed(1)}% of ${strict.length}` +
        (knownLeaks.length ? ` · known lexical leaks (model gate): ${knownLeaks.length}/${outOfScope.length - strict.length}\n  ${knownLeaks.join("\n  ")}` : "") +
        (leaks.length ? `\n  leaks:\n  ${leaks.join("\n  ")}` : ""),
    );
    expect(leaks).toEqual([]);
  });

  it("treats an empty or stopword-only question as not covered without hits", () => {
    expect(search(indexes.en, "   ").covered).toBe(false);
    expect(search(indexes.en, "what is it?").hits).toEqual([]);
    expect(search(indexes.es, "¿qué es?").covered).toBe(false);
  });
});
