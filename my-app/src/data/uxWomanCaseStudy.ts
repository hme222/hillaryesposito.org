/**
 * UX Woman — shared evidence ledger.
 *
 * One list, read by the case-study hero and the Home "Selected work" row, so
 * the two never disagree. Every figure traces to the project's research
 * folder (overall interview patterns, 2026-10-13; five pretotypes,
 * 2026-10-11). Interviewees are anonymized and appear by role only, never by
 * name. The HR interview is adjacent evidence, not healthcare validation, and
 * the zero rows are stated on purpose: they are the limits of the evidence.
 */
export type UxWomanLedgerRow = { n: string; en: string; es: string };

export const UXWOMAN_LEDGER: UxWomanLedgerRow[] = [
  { n: "6", en: "Healthcare interviews", es: "Entrevistas de salud" },
  { n: "1", en: "Adjacent HR interview", es: "Entrevista adyacente de RR. HH." },
  { n: "0", en: "Patient interviews", es: "Entrevistas con pacientes" },
  { n: "5", en: "Pretotypes designed", es: "Pretotipos diseñados" },
  { n: "0", en: "Pretotypes run", es: "Pretotipos ejecutados" },
];
