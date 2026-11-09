/**
 * UX Woman — shared evidence ledger.
 *
 * One list, read by the case-study hero and the Home "Selected work" row, so
 * the two never disagree. Every figure traces to the project's research
 * folder and the 2026 midterm deck (rewritten 2026-11-09). Interviewees are
 * anonymized and appear by role only, never by name. The zero rows are stated
 * on purpose: they are the limits of the evidence.
 */
export type UxWomanLedgerRow = { n: string; en: string; es: string };

export const UXWOMAN_LEDGER: UxWomanLedgerRow[] = [
  { n: "6", en: "Interviews with clinic and insurer staff", es: "Entrevistas con personal de clínicas y aseguradoras" },
  { n: "0", en: "Patient interviews", es: "Entrevistas con pacientes" },
  { n: "6", en: "Public sources", es: "Fuentes públicas" },
  { n: "2", en: "Hypotheses", es: "Hipótesis" },
  { n: "0", en: "Tests run", es: "Pruebas realizadas" },
];
