/**
 * Client feedback — the only third-party voice on the site.
 *
 * Lifted out of AboutMe so Home and About render the same quote from one
 * source. Duplicating it would let the two copies drift, and this is
 * attributed testimony: the wording, name, role, and context all have to stay
 * exactly as given.
 */

export type ClientFeedback = {
  quote: string;
  name: string;
  role: string;
  context: string;
};

export const CLIENT_FEEDBACK: ClientFeedback[] = [
  {
    quote:
      "Hillary was timely, communicative, and diligent in ensuring that every screen and interaction was captured to a high standard.",
    name: "Lynette Yap",
    role: "Content and Community @ Mobbin",
    context: "Client recommendation, freelance UX flow documentation project",
  },
];

export const CLIENT_FEEDBACK_ES: ClientFeedback[] = [
  {
    quote:
      "Hillary fue puntual, comunicativa y diligente para asegurar que cada pantalla e interacción se capturara con un estándar alto.",
    name: "Lynette Yap",
    role: "Content and Community @ Mobbin",
    context: "Recomendación de cliente, proyecto freelance de documentación de flujos UX",
  },
];
