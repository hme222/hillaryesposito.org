import React from "react";
import type { ReactNode } from "react";
import {
  HandIcon,
  LaunchIcon,
  MedicalCrossIcon,
  PencilIcon,
  SproutIcon,
  TerminalIcon,
} from "../components/LineIcons";

export type CuratedLink = {
  label: string;
  path: string;
  description: string;
  icon: ReactNode;
};

export type CuratedPage = {
  slug: string;
  company: string;
  role: string;
  variant: "care" | "finance" | "fashion";
  /** Company-mirror accent — re-inks the coral pop to evoke the company.
   *  `accent` is the light-theme value (must reach 4.5:1 as text on light paper
   *  and behind white); `accentDark` is the dark-theme value (4.5:1 as text on
   *  dark paper and behind dark ink). Falls back to the default coral if omitted. */
  accent?: string;
  accentDark?: string;
  /** Real riso graphic inked as the hero canvas + the edition (duotone ink). */
  mapSrc?: string;
  edition?: "pine" | "struct" | "meta" | "mdv" | "olive" | "eucalyptus";
  badgeLabel: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  meta: Array<{ label: string; value: string }>;
  intro: string[];
  proofPoints: Array<{ stat: string; detail: string }>;
  featuredWork: Array<{
    title: string;
    reason: string;
    image?: string;
    imageAlt?: string;
    evidence?: Array<{ label: string; value: string }>;
  }>;
  strengths: string[];
  relevantExperience: string[];
  keywords: string[];
  hiringManagerNote: string;
  closing: string;
  supportLinks: CuratedLink[];
  relatedLinks: CuratedLink[];
  /** Role-specific conversion controls. Existing pages keep the default
   *  fit-first order and actions when these values are omitted. */
  proofFirst?: boolean;
  caseStudyCtaLabel?: string;
  proofKicker?: string;
  proofTitle?: string;
  resumeLink?: { label: string; path: string };
  contactFirst?: boolean;
};

const allCuratedPages: Record<string, CuratedPage> = {
  "healthcare-product-service-designer": {
    slug: "healthcare-product-service-designer",
    company: "Healthcare product + service",
    role: "Mid-level Product / Service Designer",
    variant: "care",
    accent: "#285943",
    accentDark: "#8dbb9d",
    mapSrc: "/riso/elevation-03.jpg",
    edition: "eucalyptus",
    badgeLabel: "Clinical workflow · end-to-end service · implementation",
    eyebrow: "Healthcare systems · service design · product delivery",
    headline: "I spent 13+ years inside the services I now redesign.",
    subhead:
      "Inside clinical operations, I mapped a paper detour that became an implemented digital workflow.",
    meta: [
      { label: "Target role", value: "Healthcare Product / Service Designer" },
      { label: "Domain", value: "Cancer care · clinical operations · medical logistics" },
      { label: "Core proof", value: "Current/future state · handoffs · implementation · outcomes" },
      { label: "Credentials", value: "MHA · Lean Six Sigma Green Belt · Army veteran" },
    ],
    intro: [
      "I follow the whole service path, make the workaround and owner visible, then test whether the change survives without its author.",
    ],
    proofPoints: [
      {
        stat: "21,000+",
        detail: "clinicians and administrative staff across the MSK workflows I helped redesign",
      },
      {
        stat: "20%",
        detail: "organization-wide EMR cost reduction; my workflow redesign contributed inside the larger initiative",
      },
      {
        stat: "85%",
        detail: "faster medical resupply across seven aid stations after shared digital tracking",
      },
    ],
    featuredWork: [
      {
        title: "MSK: a filing queue replaced a four-system workaround",
        reason: "A paper detour became one implemented digital workflow.",
        image: "/assets/msk/mskcc-map-thumb.jpg",
        imageAlt: "Recreated map of the Memorial Sloan Kettering care network",
        evidence: [
          { label: "Constraint", value: "Four departments" },
          { label: "Change", value: "File from the queue" },
          { label: "State", value: "Implemented" },
          { label: "Owner", value: "Initiated + presented" },
          { label: "Outcome", value: "Used through 2 upgrades" },
        ],
      },
      {
        title: "Medical logistics: resupply time reduced 85%",
        reason: "One shared service across seven aid stations.",
        image: "/assets/about/army.jpg",
        imageAlt: "Hillary Esposito during her deployment as a medical logistics officer",
        evidence: [
          { label: "Constraint", value: "48-hour cold chain" },
          { label: "Change", value: "Shared tracking" },
          { label: "State", value: "Deployed" },
          { label: "Owner", value: "Medical logistics lead" },
          { label: "Outcome", value: "85% shorter resupply time" },
        ],
      },
      {
        title: "Grove: research cut eleven features to three",
        reason: "Survey evidence narrowed a functional prototype.",
        image: "/assets/grove/grove1.png",
        imageAlt: "Grove plant-care prototype home screen",
        evidence: [
          { label: "Constraint", value: "AI-built overload" },
          { label: "Change", value: "11 features → 3" },
          { label: "State", value: "Phase 2 of 3" },
          { label: "Owner", value: "Sole designer" },
          { label: "Outcome", value: "Functional prototype" },
        ],
      },
    ],
    strengths: [
      "Map frontstage tasks to backstage people, systems, permissions, and handoffs",
      "Translate clinical and operational constraints into product states and service decisions",
      "Align Product, Engineering, clinical, IT, and operations partners around one visible model",
      "Carry a workflow through presentation, implementation, training, and adoption",
    ],
    relevantExperience: [
      "I spent six years at MSK across three roles, working with Epic, clinical operations, compliance, onboarding, and internal workflow change.",
      "In military medicine, I owned the resupply service end to end. Cold chain, security, and casualty risk were fixed constraints, not edge cases.",
      "With Grove, I handle the current craft: define research, narrow scope, design responsive accessible interactions, and code the prototype.",
    ],
    keywords: [
      "healthcare product design",
      "service design",
      "clinical workflows",
      "journey mapping",
      "service blueprinting",
      "current-state mapping",
      "future-state design",
      "internal tools",
      "cross-functional collaboration",
      "design systems",
      "accessibility",
      "implementation",
    ],
    hiringManagerNote:
      "My Product Designer title is newer than my healthcare practice. The artifacts show the work: map, align, implement, sustain.",
    closing:
      "I am strongest where a healthcare product is also a service: multiple roles, consequential handoffs, policy and technical constraints, and a person who still has to act correctly at the end.",
    supportLinks: [
      {
        label: "MSK clinical workflow case study",
        path: "/case-study/msk",
        description: "Current/future-state mapping, cross-functional implementation, and evidence that lasted through system upgrades.",
        icon: <MedicalCrossIcon />,
      },
      {
        label: "Medical logistics service-design case study",
        path: "/case-study/logistics",
        description: "An end-to-end service redesign for 5,000+ soldiers and seven aid stations.",
        icon: <HandIcon />,
      },
      {
        label: "Grove product-design case study",
        path: "/case-study/grove",
        description: "Research-led product scope, trustworthy AI interactions, accessibility, and a functional React prototype.",
        icon: <SproutIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "Main portfolio",
        path: "/",
        description: "Healthcare-first portfolio and contact section.",
        icon: <LaunchIcon />,
      },
    ],
    proofFirst: true,
    proofKicker: "Measured outcomes, with attribution",
    caseStudyCtaLabel: "Review MSK",
    resumeLink: {
      label: "View healthcare Product / Service résumé · PDF ↗",
      path: "/assets/Hillary_Esposito_Healthcare_Product_Service_Designer_Resume.pdf",
    },
    contactFirst: true,
  },
  "healthcare-ux-researcher": {
    slug: "healthcare-ux-researcher",
    company: "Healthcare UX research + service design",
    role: "UX Researcher / Service Designer · workflows and complex services",
    variant: "care",
    accent: "#315f54",
    accentDark: "#91c2b2",
    mapSrc: "/riso/elevation-01.jpg",
    edition: "struct",
    badgeLabel: "What changed · what remains unknown",
    eyebrow: "Healthcare workflow research + service design",
    headline: "Research should change the decision, not decorate the process.",
    subhead:
      "A dated self-report survey narrowed Grove’s next build and left its behavioral questions open.",
    meta: [
      { label: "Target lane", value: "Healthcare UXR + Service Design" },
      { label: "Methods shown", value: "Survey · workflow observation · service mapping · synthesis" },
      { label: "Evidence rule", value: "Method · source · decision · limitation" },
      { label: "Next gate", value: "Complete 6–8 participant evaluative study + UXR lead review" },
    ],
    intro: [
      "I frame the decision, trace the real workflow, separate evidence types, and name what the record cannot support.",
    ],
    proofPoints: [
      {
        stat: "34",
        detail: "plant owners in a defined self-report survey conducted May 22–July 8, 2026",
      },
      {
        stat: "Boundary",
        detail: "MSK workflow observation occurred; the session count was not preserved",
      },
      {
        stat: "4",
        detail: "MSK departments aligned through one current/future-state workflow map; observation count was not preserved",
      },
    ],
    featuredWork: [
      {
        title: "Grove: one survey changed what I built",
        reason: "Self-report changed scope; it did not prove behavior.",
        image: "/assets/grove/grove1.png",
        imageAlt: "Grove plant-care prototype home screen",
        evidence: [
          { label: "Question", value: "What deserves the next build?" },
          { label: "Method", value: "34-person survey" },
          { label: "Signal", value: "Care over community" },
          { label: "Decision", value: "11 features → 3" },
          { label: "Limitation", value: "Self-report sample" },
        ],
      },
      {
        title: "MSK: operational observation made a hidden workaround visible",
        reason: "A shared map aligned four departments around one failure.",
        image: "/assets/msk/mskcc-map-thumb.jpg",
        imageAlt: "Recreated map of the Memorial Sloan Kettering care network",
        evidence: [
          { label: "Question", value: "Where does filing stall?" },
          { label: "Method", value: "Workflow observation" },
          { label: "Signal", value: "Paper detour" },
          { label: "Decision", value: "File in the queue" },
          { label: "Limitation", value: "Count not preserved" },
        ],
      },
      {
        title: "Medical logistics: one service across seven aid stations",
        reason: "Operational service evidence, not formal UXR.",
        image: "/assets/about/army.jpg",
        imageAlt: "Hillary Esposito during her deployment as a medical logistics officer",
        evidence: [
          { label: "Question", value: "Where does resupply slow?" },
          { label: "Method", value: "Service operations" },
          { label: "Signal", value: "Fragmented requests" },
          { label: "Decision", value: "One protocol" },
          { label: "Limitation", value: "Not formal UXR" },
        ],
      },
    ],
    strengths: [
      "Frame research around a product or service decision and the cost of being wrong",
      "Separate self-report, observed behavior, qualitative explanation, and bounded counts",
      "Map frontstage work, backstage systems, handoffs, and decision ownership",
      "Write limitations and next evidence into the artifact instead of a presentation footnote",
    ],
    relevantExperience: [
      "Grove contains my cleanest current research record: a dated self-report survey, the decision it changed, a working prototype, and the next study.",
      "At MSK, I observed the real workflow, brought clinical, IT, imaging, and operations into one current/future-state map, and saw the process implemented. The observation count was not preserved.",
      "My MHA, public-health degree, and Lean Six Sigma training help me read healthcare systems. They are context, not proof of research rigor.",
    ],
    keywords: [
      "healthcare UX research",
      "qualitative research",
      "survey design",
      "usability testing",
      "workflow observation",
      "research synthesis",
      "journey mapping",
      "service blueprinting",
      "research planning",
      "service design research",
      "stakeholder research",
      "research limitations",
    ],
    hiringManagerNote:
      "Strongest lane: embedded research for complex services. Grove proves survey-to-scope; MSK proves workflow-to-implementation. Task-level Grove findings remain unclaimed.",
    closing:
      "I am most useful where healthcare research crosses roles, systems, policy, and service delivery. That is where the team needs evidence translated into a product or service decision.",
    supportLinks: [
      {
        label: "Grove research and product-decision case study",
        path: "/case-study/grove#grove-research",
        description: "Dated survey, evidence type, scope change, limitations, and planned next test.",
        icon: <SproutIcon />,
      },
      {
        label: "MSK workflow-research case study",
        path: "/case-study/msk#msk-workflow",
        description: "Operational observation, workflow synthesis, cross-functional influence, and implemented change.",
        icon: <MedicalCrossIcon />,
      },
      {
        label: "Medical logistics service-design case study",
        path: "/case-study/logistics",
        description: "An end-to-end service redesign across seven aid stations, with measured time and spending outcomes.",
        icon: <HandIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "Healthcare Product / Service view",
        path: "/curated/healthcare-product-service-designer",
        description: "The primary hiring lane: clinical workflow, service systems, and implementation.",
        icon: <LaunchIcon />,
      },
    ],
    proofFirst: true,
    proofKicker: "Evidence type and boundary",
    proofTitle: "What the evidence supports",
    caseStudyCtaLabel: "Review Grove research",
    resumeLink: {
      label: "View healthcare UXR + Service Design résumé · PDF ↗",
      path: "/assets/Hillary_Esposito_Healthcare_UX_Research_Resume.pdf",
    },
    contactFirst: true,
  },
  "the-sill-product-designer": {
    slug: "the-sill-product-designer",
    company: "The Sill",
    role: "Product / UX Designer · proactive talent introduction",
    variant: "care",
    accent: "#3d6b3f",
    accentDark: "#92bd78",
    mapSrc: "/riso/elevation-03.jpg",
    edition: "olive",
    badgeLabel: "Plant care · consumer product · honest prototype",
    eyebrow: "Plant education · ongoing care · consumer product judgment",
    headline: "Grove turns plant-care overwhelm into one calm next action.",
    subhead:
      "Checked August 20, 2026: The Sill's official careers page listed no open roles and invited talent-pool introductions. This is a proactive product-design fit note, not an application to a posted opening.",
    meta: [
      { label: "Target", value: "The Sill · future Product / UX opportunity" },
      { label: "Lead proof", value: "Grove functional prototype · Phase 2 of 3" },
      { label: "Research", value: "34-person self-report survey · 11 → 3 features" },
      { label: "Product thesis", value: "Help a person choose, understand, and keep a plant alive" },
    ],
    intro: [
      "The Sill's mission joins plant access with horticultural education. Grove works on the next part of that service: once a plant is home, can the owner understand what it needs without guilt, false certainty, or a wall of features?",
      "I surveyed 34 plant owners, cut an AI-built concept from eleven features to three, and rebuilt the experience around calm reminders, identification that shows confidence and sources, and safety information that appears before a wrong guess can become harm.",
    ],
    proofPoints: [
      {
        stat: "34",
        detail: "plant owners surveyed before the redesign; self-report, not observed market demand",
      },
      {
        stat: "11 → 3",
        detail: "features after research moved care, identification, and light help ahead of social mechanics",
      },
      {
        stat: "Phase 2/3",
        detail: "functional prototype with a visible decision log and a defined next usability study",
      },
    ],
    featuredWork: [
      {
        title: "Grove: plant care without guilt or false certainty",
        reason: "Consumer onboarding, ongoing care, plant identification, calm notification logic, pet-safety provenance, and an honest prototype boundary.",
      },
      {
        title: "Mobbin: 200+ screens per app, searchable by task",
        reason: "Supporting evidence of close consumer-interface analysis, taxonomy, onboarding patterns, and production documentation across mature products.",
      },
      {
        title: "The product-service opportunity",
        reason: "Connect choosing and learning about a plant with the ongoing care experience after delivery. This is an adjacent service hypothesis, not claimed shipped work.",
      },
    ],
    strengths: [
      "Design calm onboarding and care loops for people who are interested but not yet confident",
      "Turn plant-owner language and self-reported priorities into product scope",
      "Design AI identification to show confidence, sources, and a safe stopping point",
      "Balance education, warmth, accessibility, and consumer interaction craft without gamifying care into anxiety",
    ],
    relevantExperience: [
      "Grove is my plant-care product: research, scope decisions, interaction design, accessibility, and a coded prototype.",
      "Documenting Mobbin flows trained me to compare consumer onboarding patterns and name them consistently.",
      "Healthcare and medical logistics taught me to slow down around confident wrong answers. That instinct matters when the answer can affect a pet, plant, or person.",
    ],
    keywords: [
      "consumer product design",
      "plant care",
      "horticultural education",
      "onboarding",
      "ongoing care",
      "information architecture",
      "user research",
      "usability testing",
      "AI confidence",
      "source provenance",
      "accessibility",
      "functional prototyping",
    ],
    hiringManagerNote:
      "I have not shipped The Sill's commerce, subscription, fulfillment, or retention systems, and I am not presenting Grove as that experience. The credible fit is category-specific research, a working plant-care product, consumer interaction craft, and a service-design question that begins where the purchase journey ends.",
    closing:
      "For a future Product / UX role at The Sill or a similar plant and home-care company, I would bring category commitment, research-led scope, trustworthy AI interaction, and a product view of the full choose-to-care journey.",
    supportLinks: [
      {
        label: "Grove plant-care case study",
        path: "/case-study/grove",
        description: "The research, product decisions, AI trust model, and functional prototype behind the plant-care direction.",
        icon: <SproutIcon />,
      },
      {
        label: "Mobbin consumer-pattern study",
        path: "/case-study/mobbin",
        description: "Pattern analysis, taxonomy, and documentation across 200+ screens per finance app.",
        icon: <PencilIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "Main healthcare-first portfolio",
        path: "/",
        description: "Full product/service design portfolio and contact section.",
        icon: <LaunchIcon />,
      },
    ],
    proofFirst: true,
    proofKicker: "Plant-care evidence, with boundaries",
    caseStudyCtaLabel: "Review Grove",
    resumeLink: {
      label: "View The Sill Product / UX résumé · PDF ↗",
      path: "/assets/Hillary_Esposito_The_Sill_Product_Designer_Resume.pdf",
    },
    contactFirst: true,
  },
  "supabase-product-designer": {
    slug: "supabase-product-designer",
    company: "Supabase",
    role: "Product Designer",
    variant: "care",
    accent: "#3d6b3f",
    accentDark: "#7cb069",
    mapSrc: "/riso/elevation-03.jpg",
    edition: "struct",
    badgeLabel: "Selected product evidence",
    eyebrow: "Working prototypes · complex product systems · reusable patterns",
    headline: "Built a working React prototype. Improved workflows serving 21,000+ staff.",
    subhead:
      "Grove is a functional prototype in Phase 2 of 3. MSK shows implemented workflow changes at 21,000+ staff scale.",
    meta: [
      { label: "Target role", value: "Product Designer" },
      { label: "Lead proof", value: "Functional React prototype · Phase 2 of 3" },
      { label: "Systems proof", value: "States, permissions, and reusable patterns" },
      { label: "Working style", value: "Research, written decisions, and working software" },
    ],
    intro: [
      "I work best when research, technical constraints, and product decisions have to meet in something a team can use.",
      "For Grove, I turned 34 survey responses into a three-feature scope and a functional React prototype. At MSK, one workflow map helped clinical, IT, and operations partners align around implemented changes.",
    ],
    proofPoints: [
      {
        stat: "11 → 3 features",
        detail: "kept after a 34-person survey changed Grove's product scope",
      },
      {
        stat: "21,000+",
        detail: "clinical and administrative staff across the MSK workflows I helped redesign",
      },
      {
        stat: "20%",
        detail: "organization-wide EMR cost reduction; my workflow redesign contributed inside the larger initiative",
      },
    ],
    featuredWork: [
      {
        title: "Grove: cut eleven features to three after research",
        reason: "A functional React prototype with the research decisions, interactive states, and code boundary visible. Phase 2 of 3; not a shipped product.",
      },
      {
        title: "MSK: moved a paper workaround back into the digital workflow",
        reason: "A cross-functional workflow map helped clinical, IT, and operations partners align on permissions, states, and implemented changes.",
      },
      {
        title: "Mobbin: documented 200+ screens per app for pattern analysis",
        reason: "Supporting evidence of close interface analysis, reusable pattern judgment, and documentation built for other product and design teams.",
      },
    ],
    strengths: [
      "Turn an uncertain product question into a testable React flow",
      "Map states and permissions before they become handoff gaps",
      "Write down why scope changed, who it affects, and what remains unbuilt",
    ],
    relevantExperience: [
      "Grove shows that research changed the scope before I built the React prototype.",
      "MSK shows complex workflow decisions, technical partnership, and results across a large organization.",
      "Mobbin shows production-pattern fluency and documentation discipline across mature product interfaces.",
    ],
    keywords: [
      "product design",
      "working prototypes",
      "user flows",
      "user research",
      "usability",
      "technical constraints",
      "cross-functional alignment",
      "product primitives",
      "React",
      "AI-assisted prototyping",
    ],
    hiringManagerNote:
      "My developer-tool experience is adjacent, not direct. The relevant proof is a React prototype, documented interaction and system decisions, and implemented internal-workflow changes with technical partners. I would bring that builder discipline while learning Supabase's developer surface.",
    closing:
      "I want to help Supabase make complex developer workflows coherent without hiding the system underneath.",
    supportLinks: [
      {
        label: "Grove case study",
        path: "/case-study/grove",
        description: "Functional React prototype, research-led scope, interactive states, and a clear record of where AI accelerated implementation.",
        icon: <SproutIcon />,
      },
      {
        label: "MSK case study",
        path: "/case-study/msk",
        description: "Complex workflow redesign, cross-functional alignment, permissions, states, and qualified results.",
        icon: <MedicalCrossIcon />,
      },
      {
        label: "Mobbin case study",
        path: "/case-study/mobbin",
        description: "Pattern analysis and documentation across more than 200 screens per app.",
        icon: <PencilIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "Main portfolio",
        path: "/",
        description: "Full product-design portfolio and contact section.",
        icon: <LaunchIcon />,
      },
    ],
    proofFirst: true,
    caseStudyCtaLabel: "Review Grove",
    proofKicker: "Numbers in context",
    resumeLink: {
      label: "View Supabase résumé · PDF ↗",
      path: "/assets/Hillary_Esposito_Supabase_Product_Designer_Resume.pdf",
    },
    contactFirst: true,
  },
  "indyx-ux-product-designer": {
    slug: "indyx-ux-product-designer",
    company: "Indyx",
    role: "UX / Product Designer",
    variant: "care",
    accent: "#8f4a2c",
    accentDark: "#e0a074",
    mapSrc: "/riso/elevation-03.jpg",
    edition: "pine",
    badgeLabel: "Consumer product design view",
    eyebrow: "Consumer product · human-first · sustainable by design",
    headline: "Design for the closet you already own — human judgment over the algorithm",
    subhead:
      "Consumer interaction craft, research that keeps taste honest, and a real belief that the best product decisions — like the best styling — come from human judgment, not an algorithm.",
    meta: [
      { label: "Target role", value: "UX / Product Designer · consumer" },
      { label: "Focus", value: "Interaction craft, research, cataloging & analytics UX" },
      { label: "Best fit", value: "Human-first consumer product, sustainable by design" },
      { label: "Tools", value: "Figma + research + AI-assisted prototyping" },
    ],
    intro: [
      "Indyx helps people love the wardrobe they already own — catalog it, see it clearly, and get dressed with joy instead of decision fatigue. I've spent the last year building the closest thing to that in a different category: Grove, a functional consumer prototype that helps people organize and care for what they already have, and removes the overwhelm that makes them give up.",
      "The deeper fit is a value, not a category. Indyx's thesis is that “style is a human art that can never be replaced by an algorithm.” In Grove, the defining design work was exactly that: I let an AI build the first version, then overruled it five times to keep a person in charge of the calls that matter. I design consumer products where taste and judgment lead, and research keeps them honest.",
    ],
    proofPoints: [
      { stat: "200+", detail: "screens documented for Mobbin across three finance apps — pattern fluency for how mature consumer products handle onboarding, discovery, and data" },
      { stat: "34", detail: "owners surveyed before I redesigned a single Grove screen — product calls traced to real people, not assumptions" },
      { stat: "5", detail: "calls I overruled the AI on in Grove to keep a human in charge — the same 'human over algorithm' belief Indyx is built on" },
    ],
    featuredWork: [
      { title: "Grove — a consumer prototype for what you already own", reason: "Cataloging, calm daily-use flows, and AI-override judgment. The closest analog to Indyx: organize what you own, reduce overwhelm, keep humans in charge." },
      { title: "Mobbin — 200+ screens per app across three finance apps, studied for craft", reason: "Pattern fluency and taste from 200+ screens per app documented across three finance apps — directly useful for cataloging speed and outfit discoverability." },
      { title: "The 'AI vs. mine' calls", reason: "A record of where I let the algorithm accelerate the work and where I overruled it — Indyx's stylist-not-algorithm belief, shown not told." },
    ],
    strengths: [
      "Consumer interaction craft: onboarding, daily-use loops, and the small details that make an app feel joyful instead of a chore",
      "Research-led: surveys, moderated testing, and decision logs so product calls trace back to real people",
      "Human-over-algorithm judgment: I use AI to accelerate, then document where a person has to overrule it",
      "Reducing overwhelm: turning “I have nothing to wear” into one clear, calm next step",
      "Analytics UX: making data (wear frequency, cost-per-wear, care history) feel actionable and intuitive, not like a spreadsheet",
      "Sustainability-minded: designing to celebrate what people already own, not to sell them more",
    ],
    relevantExperience: [
      "Grove maps almost 1:1 to Indyx's UX challenges: fast cataloging of what you own, surfacing combinations people miss, keeping motivation through a long setup, and making care/analytics data intuitive.",
      "My Mobbin work — documenting 200+ consumer screens per app across three apps — built exactly the pattern library Indyx's problems need: efficient capture, discovery, and photo-quality consistency.",
      "Six years in healthcare systems taught me to design where a wrong answer has a cost and trust is everything — the same rigor Indyx wants behind a product people invite into their daily routine.",
    ],
    keywords: [
      "consumer product design",
      "fashion tech",
      "digital wardrobe",
      "styling",
      "sustainability",
      "cataloging UX",
      "onboarding",
      "analytics UX",
      "human-centered AI",
      "mobile app",
      "iOS",
      "Android",
      "discovery",
      "decision fatigue",
      "cost-per-wear",
      "user research",
    ],
    hiringManagerNote:
      "I'm not coming from a decade inside fashion. I'm coming with a functional consumer-app prototype that does what Indyx does in spirit — help people love what they already own — plus the research habit and the conviction that humans, not algorithms, make the calls that matter. That's the fit.",
    closing:
      "For Indyx's UX/Product Designer role, I'd bring consumer interaction craft, research that keeps taste honest, and a genuine belief in human judgment over the algorithm — designing a product that makes getting dressed joyful, intentional, and yours.",
    supportLinks: [
      { label: "Grove case study", path: "/case-study/grove", description: "A functional consumer prototype for what you already own — cataloging, calm daily use, and AI-override judgment.", icon: <SproutIcon /> },
      { label: "Mobbin case study", path: "/case-study/mobbin", description: "200+ screens per app across three finance apps — pattern fluency and taste.", icon: <PencilIcon /> },
    ],
    relatedLinks: [],
  },
  "meta-instagram-product-designer": {
    slug: "meta-instagram-product-designer",
    company: "Meta · Instagram",
    role: "Product Designer",
    variant: "care",
    accent: "#1257c4",
    accentDark: "#7fb0ff",
    mapSrc: "/riso/elevation-01.jpg",
    edition: "meta",
    badgeLabel: "Consumer product craft view",
    eyebrow: "Interaction craft · consumer product judgment · research-led",
    headline: "Designing consumer products where research keeps taste honest",
    subhead:
      "I design consumer products where the details decide everything — how it feels, whether people trust it, whether they come back. I check my taste against research, then build for the parts people actually notice.",
    meta: [
      { label: "Focus", value: "Consumer interaction craft" },
      { label: "Strength", value: "Taste + research + product judgment" },
      { label: "Evidence", value: "Functional AI consumer-app prototype · 200+ app patterns studied" },
      { label: "Best fit", value: "Consumer product design where craft is the product" },
    ],
    intro: [
      "Consumer products win or lose on details most people never consciously notice: the timing of a reveal, a calm default, the one screen that earns trust. That's the work I care about most.",
      "I'm not coming from a decade inside big consumer social. I'm coming with a functional AI consumer-app prototype, a research habit that kills my own bad ideas, and years spent studying how the best consumer products actually behave, screen by screen.",
    ],
    proofPoints: [
      { stat: "5", detail: "AI calls I overruled to keep Grove calm and honest — every one logged on the case study" },
      { stat: "200+", detail: "Consumer and finance app screens documented for Mobbin, studying real interaction patterns and trust signals" },
      { stat: "34", detail: "People surveyed before I designed anything — every major design call traced back to a finding" },
    ],
    featuredWork: [
      {
        title: "Grove — AI consumer-app prototype",
        reason: "Leads with interaction craft, calm defaults, AI trust states, and product judgment — including where I overruled the AI to keep the product calm and honest.",
      },
      {
        title: "Mobbin — consumer pattern study",
        reason: "200+ screens per app documented for craft; pattern fluency across three finance apps, screen by screen.",
      },
      {
        title: "The 'AI vs. mine' calls",
        reason: "A visual record of five product decisions where craft and research beat the obvious AI default.",
      },
      {
        title: "MSK — systems rigor",
        reason: "Shows role-based flows, states, and permissions for 21,000+ clinicians and staff — where clarity was safety-critical.",
      },
    ],
    strengths: [
      "Interaction craft at the level of timing, defaults, and the one screen that earns trust",
      "Calm, trustworthy defaults over loud ones",
      "Research that pressure-tests taste instead of replacing it",
      "Pattern fluency from 200+ consumer screens per app, studied firsthand",
    ],
    relevantExperience: [
      "Grove is my clearest consumer-craft artifact: I designed the interaction model, the AI trust states, and the calm reminder system, then built a functional prototype — and overruled the AI wherever a wrong call would cost someone's trust.",
      "My Mobbin work is 200+ screens per app across three finance apps, documented for craft and patterns. It's why I can walk into a product and quickly see what's working, what's borrowed, and what needs fixing.",
    ],
    keywords: [],
    hiringManagerNote:
      "I'm strongest when the details decide the product — timing, defaults, trust, and the one screen that makes someone stay.",
    closing:
      "For an Instagram product-design role, I'd bring consumer craft, a research habit that keeps taste honest, and systems experience most craft-only portfolios don't have.",
    supportLinks: [
      {
        label: "Grove case study",
        path: "/case-study/grove",
        description: "Consumer AI prototype: interaction craft, trust states, and a hands-on demo.",
        icon: <SproutIcon />,
      },
      {
        label: "Mobbin case study",
        path: "/case-study/mobbin",
        description: "200+ screens per app across three finance apps, studied for craft and patterns.",
        icon: <PencilIcon />,
      },
      {
        label: "MSK case study",
        path: "/case-study/msk",
        description: "Systems rigor: role-based flows, states, and permissions for 21,000+ clinicians and staff.",
        icon: <MedicalCrossIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "Main portfolio",
        path: "/",
        description: "Full UX/product portfolio and contact section.",
        icon: <LaunchIcon />,
      },
    ],
  },
  "omada-staff-product-designer-healthcare-ai": {
    slug: "omada-staff-product-designer-healthcare-ai",
    company: "Omada Health",
    role: "Staff Product Designer",
    variant: "care",
    badgeLabel: "Healthcare product view",
    eyebrow: "Complex systems UX · internal tools · healthcare product thinking",
    headline: "Designing trusted tools for complex healthcare workflows",
    subhead:
      "I'm a UX and product designer with an MHA and healthcare operations depth, focused on reducing friction in clinical and operational work without losing clarity or trust.",
    meta: [
      { label: "Focus", value: "Complex systems UX" },
      { label: "Strength", value: "Internal tools + product judgment" },
      { label: "Evidence", value: "21,000+ clinicians and staff, 20% cost reduction contribution, 70% ahead of deadline" },
      { label: "Best fit", value: "High-stakes internal tools and healthcare workflows" },
    ],
    intro: [
      "My strongest product work starts with how care and operations actually run: where teams slow down, where handoffs break, and where the system asks too much of the people using it. I bring healthcare operations, UX research, internal tools, and product judgment together to make those moments clearer and easier to act on.",
      "I don't treat healthcare like generic SaaS. I understand the pressure behind clinical and operational work, and I design with that reality in mind so products support better decisions, smoother coordination, and more usable day-to-day workflows.",
    ],
    proofPoints: [
      { stat: "21,000+", detail: "Clinicians and administrative staff affected by workflow redesign work at Memorial Sloan Kettering" },
      { stat: "20%", detail: "Organization-wide EMR cost reduction; I initiated a workflow redesign that contributed inside a larger initiative" },
      { stat: "70%", detail: "Every CPR certification collected 70% ahead of a deadline that was about to slip, after I rewrote the technical/legal material for the clinicians completing it" },
    ],
    featuredWork: [
      {
        title: "MSK internal tools and workflow redesign",
        reason: "Shows direct healthcare credibility, operational context, and measurable impact at scale.",
      },
      {
        title: "CPR certification rewrite and onboarding workflow redesign",
        reason: "Demonstrates plain-language content design for a clinical audience, role-based workflows, and cross-functional coordination.",
      },
      {
        title: "Grove product work",
        reason: "Adds product judgment, rapid iteration, and thoughtful use of AI-supported tooling without overclaiming AI delivery.",
      },
      {
        title: "Military medical logistics transformation",
        reason: "Reinforces systems thinking, reliability, and execution in high-consequence environments.",
      },
    ],
    strengths: [
      "Operational pain points turned into clearer product direction",
      "Healthcare context that shortens the learning curve on real care workflows",
      "Range across research, internal tools, and product execution",
      "Improves usability without losing operational rigor or trust",
    ],
    relevantExperience: [
      "At Memorial Sloan Kettering, I worked inside healthcare operations before moving into UX and internal tools work. That combination gives me unusually strong context for designing systems that need to work for real staff under pressure, not just in polished demos.",
      "As an Army medical logistics officer, I also led process and tracking improvements where reliability and speed had direct consequences. That experience sharpened how I think about handoffs, failure points, and decision support inside complex systems.",
    ],
    keywords: [
      "HIPAA",
      "Epic",
      "Epic training",
      "healthcare compliance",
      "clinical workflow design",
      "EHR / EMR workflows",
      "healthcare",
      "workflow design",
      "internal tools",
      "research",
      "clinical operations",
      "trust",
      "product judgment",
      "cross-functional collaboration",
      "healthcare workflows",
      "inclusive design",
    ],
    hiringManagerNote:
      "I add the most value when product decisions change how care teams and operational teams actually get work done.",
    closing:
      "If your team needs a designer who can connect healthcare context, product judgment, and measurable systems improvement, this is the clearest view of what I'd bring.",
    supportLinks: [
      {
        label: "MSK case study",
        path: "/case-study/msk",
        description: "Healthcare systems redesign, internal tools, and workflow proof at scale.",
        icon: <MedicalCrossIcon />,
      },
      {
        label: "Grove case study",
        path: "/case-study/grove",
        description: "Product judgment, prototyping, and end-to-end collaboration.",
        icon: <SproutIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "Spring Health Staff PD",
        path: "/curated/spring-health-ai-interaction-design",
        description: "Adjacent healthcare-AI interaction-design framing.",
        icon: <HandIcon />,
      },
      {
        label: "Main portfolio",
        path: "/",
        description: "Full UX/product portfolio and contact section.",
        icon: <LaunchIcon />,
      },
    ],
  },
  "spring-health-ai-interaction-design": {
    slug: "spring-health-ai-interaction-design",
    company: "Spring Health",
    role: "Staff Product Designer, AI Interaction Design",
    variant: "care",
    badgeLabel: "Healthcare AI interaction view",
    eyebrow: "AI interaction design · healthcare workflows · human-in-the-loop trust",
    headline: "Designing AI interactions for healthcare workflows where trust is the product",
    subhead:
      "I design AI-enabled experiences with a healthcare operator's understanding of stakes, edge cases, handoffs, and the need for human judgment.",
    meta: [
      { label: "Focus", value: "AI interaction patterns for healthcare" },
      { label: "Strength", value: "Healthcare workflow judgment + AI trust states" },
      { label: "Evidence", value: "MSK systems work, Grove AI, Mobbin pattern fluency" },
      { label: "Best fit", value: "Human-in-the-loop AI experiences in high-trust care contexts" },
    ],
    intro: [
      "Spring Health is asking for more than a chat interface. It needs AI that knows its boundaries, escalates when it should, and hands the decision back to a person before anything matters — which is the part I have actually designed for.",
      "My strongest fit is the combination of healthcare systems experience, AI product exploration, and workflow design under real constraints.",
    ],
    proofPoints: [
      { stat: "MSK", detail: "Healthcare systems experience across clinical operations, training, implementation, and workflow redesign" },
      { stat: "20%", detail: "Organization-wide EMR cost reduction; I initiated a healthcare workflow redesign that contributed inside a larger initiative" },
      { stat: "70%", detail: "Every CPR certification collected 70% ahead of a deadline that was about to slip, after I rewrote the technical/legal material for the clinicians completing it" },
      { stat: "7", detail: "Aid stations coordinated through high-pressure medical logistics workflows across three countries" },
    ],
    featuredWork: [
      {
        title: "Grove AI",
        reason: "Leads with AI workflow, prompts, trust states, and human-in-the-loop product judgment.",
      },
      {
        title: "MSK workflow redesign",
        reason: "Shows healthcare domain credibility, stakeholder complexity, and measurable outcomes.",
      },
      {
        title: "Mobbin",
        reason: "Shows pattern literacy and the ability to translate interface patterns into reusable design decisions.",
      },
    ],
    strengths: [
      "AI quality framed through intent, boundaries, feedback, evaluation, and reuse",
      "Healthcare fluency that reduces ramp time on clinical and care-team workflows",
      "Design for escalation, uncertainty, human override, and trust — never AI as magic",
      "Can connect AI interaction patterns to reusable product and design-system decisions",
    ],
    relevantExperience: [
      "At Memorial Sloan Kettering, I worked close to healthcare operations and internal workflow improvement. That context matters for AI interaction design because the stakes are not only task completion; they include trust, escalation, appropriateness, and the human decision that follows the interface.",
      "Grove AI is the clearest current artifact for my AI product direction: intent mapping, prompt-assisted prototyping, trust states, and human fallback judgment. I'd present it as focused AI product exploration, not as a shipped clinical AI product.",
    ],
    keywords: [
      "HIPAA",
      "Epic",
      "Epic training",
      "healthcare compliance",
      "clinical workflow design",
      "EHR / EMR workflows",
      "AI interaction design",
      "healthcare",
      "mental health",
      "human-in-the-loop",
      "prompting",
      "evaluation",
      "trust",
      "fallback states",
      "clinical collaboration",
      "design systems",
    ],
    hiringManagerNote:
      "I'm not trying to look like an AI researcher. I'm positioning as a designer who can make AI experiences safer, clearer, and more useful inside healthcare workflows.",
    closing:
      "For Spring Health, I'd bring healthcare fluency, AI interaction judgment, and the calm systems thinking needed to design for people who may be navigating vulnerable moments.",
    supportLinks: [
      {
        label: "Grove case study",
        path: "/case-study/grove",
        description: "AI workflow exploration, trust states, and product prototyping.",
        icon: <SproutIcon />,
      },
      {
        label: "MSK case study",
        path: "/case-study/msk",
        description: "Healthcare systems redesign, workflow impact, and stakeholder complexity.",
        icon: <MedicalCrossIcon />,
      },
      {
        label: "Mobbin case study",
        path: "/case-study/mobbin",
        description: "Reusable product-pattern analysis and interaction-quality evidence.",
        icon: <PencilIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "Omada Staff Product Designer",
        path: "/curated/omada-staff-product-designer-healthcare-ai",
        description: "Adjacent healthcare and complex-systems product framing.",
        icon: <MedicalCrossIcon />,
      },
      {
        label: "Main portfolio",
        path: "/",
        description: "Full UX/product portfolio and contact section.",
        icon: <LaunchIcon />,
      },
    ],
  },
  "energycap-ux-ai-prototyping-data-products": {
    slug: "energycap-ux-ai-prototyping-data-products",
    company: "EnergyCAP",
    role: "UX Designer",
    variant: "finance",
    badgeLabel: "AI prototyping + data UX view",
    eyebrow: "UX design · AI-assisted prototyping · complex data products",
    headline: "UX for AI-assisted prototypes and data-heavy products that need to become real",
    subhead:
      "I design from user insight to testable interaction, with a workflow-first approach shaped by healthcare systems, logistics, data clarity, and AI-assisted build tools.",
    meta: [
      { label: "Focus", value: "Research to working prototype" },
      { label: "Strength", value: "Workflow clarity + AI-assisted build fluency" },
      { label: "Evidence", value: "Grove AI, MSK systems thinking, Mobbin pattern fluency" },
      { label: "Best fit", value: "Complex data workflows that need practical UX judgment" },
    ],
    intro: [
      "EnergyCAP is not asking for static screens. The role calls for a designer who can research, prototype, collaborate with engineering, and judge what belongs in a working product.",
      "My strongest fit is the bridge between user needs, operational complexity, data-heavy workflows, and prototype discipline.",
    ],
    proofPoints: [
      { stat: "20%", detail: "Organization-wide EMR cost reduction at MSK; I initiated a workflow redesign that contributed inside a larger initiative" },
      { stat: "70%", detail: "Every CPR certification collected 70% ahead of a deadline that was about to slip, after I rewrote the technical/legal material for the clinicians completing it" },
      { stat: "85%", detail: "Shorter medical resupply time after building tracking and reporting workflows" },
      { stat: "60%", detail: "Reduced medical logistics spending through better visibility and process structure" },
    ],
    featuredWork: [
      {
        title: "Grove AI",
        reason: "AI-assisted product/prototype exploration and trust-state thinking.",
      },
      {
        title: "MSK workflow redesign",
        reason: "Data-heavy workflow redesign, implementation partnership, and measurable outcomes.",
      },
      {
        title: "Mobbin",
        reason: "Pattern fluency and interaction-quality evidence.",
      },
    ],
    strengths: [
      "A path from user need to testable interaction without losing problem clarity",
      "AI-assisted prototyping as a way to learn faster, never a substitute for UX judgment",
      "Considers accessibility, edge cases, and engineering handoff before treating prototypes as production-ready",
      "Comfortable with operational and data-heavy product contexts where clarity matters",
    ],
    relevantExperience: [
      "My work has consistently involved making operational data easier to understand and act on. In healthcare and medical logistics, that meant clarifying workflows, status, responsibility, and the next action under real constraints.",
      "For EnergyCAP, I'd translate that into sustainability and energy data: research what users actually need to decide, prototype just enough to test the interaction, and partner with engineering on what can become real.",
    ],
    keywords: [
      "UX design",
      "AI-assisted prototyping",
      "data products",
      "research",
      "workflow design",
      "engineering collaboration",
      "accessibility",
      "HTML",
      "CSS",
      "React-adjacent prototyping",
      "complex systems",
    ],
    hiringManagerNote:
      "I'm strongest when I can move from research to working artifact without losing the user's actual need in the process.",
    closing:
      "For EnergyCAP, I'd bring a practical, evidence-led UX approach to complex sustainability and energy data workflows.",
    supportLinks: [
      {
        label: "Grove case study",
        path: "/case-study/grove",
        description: "AI-assisted product exploration and prototype thinking.",
        icon: <SproutIcon />,
      },
      {
        label: "MSK case study",
        path: "/case-study/msk",
        description: "Complex workflow redesign and measurable systems impact.",
        icon: <MedicalCrossIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "CompanyCam Product Designer",
        path: "/curated/companycam-product-designer-field-workflows",
        description: "Adjacent product design for real-world field workflows.",
        icon: <TerminalIcon />,
      },
      {
        label: "Main portfolio",
        path: "/",
        description: "Full UX/product portfolio and contact section.",
        icon: <LaunchIcon />,
      },
    ],
  },
  "companycam-product-designer-field-workflows": {
    slug: "companycam-product-designer-field-workflows",
    company: "CompanyCam",
    role: "Product Designer",
    variant: "finance",
    badgeLabel: "Field workflow product view",
    eyebrow: "Product design · real-world workflows · AI-powered team coordination",
    headline: "Product design for real-world workflows where context cannot get lost",
    subhead:
      "I design tools that help distributed teams capture, understand, and act on information, with experience across healthcare systems, military logistics, mobile product patterns, and AI-assisted workflows.",
    meta: [
      { label: "Focus", value: "Field workflow and information capture" },
      { label: "Strength", value: "Distributed coordination + mobile product judgment" },
      { label: "Evidence", value: "7 aid stations, $2M managed, resupply time reduced 85%" },
      { label: "Best fit", value: "Tools for teams doing real work under real constraints" },
    ],
    intro: [
      "CompanyCam's users are doing work in the real world, not in a clean dashboard fantasy. Product design has to respect time pressure, context switching, information capture, team coordination, and clear handoffs.",
      "My background gives me unusually direct experience with those realities across healthcare operations, military medical logistics, mobile product pattern analysis, and AI-assisted workflow exploration.",
    ],
    proofPoints: [
      { stat: "7", detail: "Aid stations coordinated through tracking and communication workflows across three countries" },
      { stat: "$2M", detail: "Medical supplies and equipment managed while improving visibility, reporting, and coordination" },
      { stat: "85%", detail: "Shorter resupply time after improving field workflow visibility and handoffs" },
      { stat: "70%", detail: "Every CPR certification collected 70% ahead of a deadline that was about to slip, after I rewrote the technical/legal material for the clinicians completing it" },
    ],
    featuredWork: [
      {
        title: "MSK workflow redesign",
        reason: "Measurable internal workflow redesign and systems thinking.",
      },
      {
        title: "Military logistics tracking",
        reason: "Real-world field workflow proof and distributed coordination.",
      },
      {
        title: "Grove AI",
        reason: "AI-powered workflow thinking and trust states.",
      },
      {
        title: "Mobbin",
        reason: "Craft, pattern fluency, and product-system awareness.",
      },
    ],
    strengths: [
      "Design for capture, context, state, trust, and speed in workflows that happen outside ideal conditions",
      "Understands how unclear handoffs create immediate downstream consequences",
      "Mobile pattern fluency and product-system awareness from ongoing Mobbin analysis",
      "Connects AI-enabled workflow ideas to practical user trust and team coordination",
    ],
    relevantExperience: [
      "In military medical logistics, I worked with distributed teams, physical constraints, missing information, and fast-moving operational needs. That is directly relevant to field workflow products where the interface has to support what people are actually doing in the moment.",
      "MSK adds healthcare systems proof, Grove adds AI-enabled workflow exploration, and Mobbin adds current mobile product fluency.",
    ],
    keywords: [
      "product design",
      "field workflows",
      "mobile UX",
      "AI-powered experiences",
      "workflow design",
      "information capture",
      "handoffs",
      "design systems",
      "states",
      "team coordination",
    ],
    hiringManagerNote:
      "I'm not coming from construction tech, but I'm coming from environments where broken workflows, missing information, and unclear handoffs have immediate consequences.",
    closing:
      "For CompanyCam, I'd bring workflow depth, mobile pattern fluency, and a practical product-design approach to tools built for people doing real work.",
    supportLinks: [
      {
        label: "MSK case study",
        path: "/case-study/msk",
        description: "Workflow redesign, systems thinking, and measurable healthcare impact.",
        icon: <MedicalCrossIcon />,
      },
      {
        label: "Grove case study",
        path: "/case-study/grove",
        description: "AI-enabled workflow thinking and trust-state exploration.",
        icon: <SproutIcon />,
      },
      {
        label: "Mobbin case study",
        path: "/case-study/mobbin",
        description: "Mobile pattern fluency and product-system awareness.",
        icon: <PencilIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "EnergyCAP UX Designer",
        path: "/curated/energycap-ux-ai-prototyping-data-products",
        description: "Adjacent AI-assisted prototyping and data-product framing.",
        icon: <TerminalIcon />,
      },
      {
        label: "Main portfolio",
        path: "/",
        description: "Full UX/product portfolio and contact section.",
        icon: <LaunchIcon />,
      },
    ],
  },
  "lumin-digital-product-designer-fintech-systems": {
    slug: "lumin-digital-product-designer-fintech-systems",
    company: "Lumin Digital",
    role: "Product Designer",
    variant: "finance",
    badgeLabel: "Digital banking systems view",
    eyebrow: "Product design · regulated systems · design systems · trust and clarity",
    headline: "Product design for complex digital systems where clarity builds trust",
    subhead:
      "I design workflow-heavy products with a systems mindset shaped by healthcare, military logistics, internal tools, research, and mobile pattern analysis.",
    meta: [
      { label: "Focus", value: "Regulated product clarity" },
      { label: "Strength", value: "Workflow design, research, and pattern fluency" },
      { label: "Evidence", value: "MSK, Mobbin, Grove AI" },
      { label: "Best fit", value: "Digital banking experiences that need trust and coherence" },
    ],
    intro: [
      "My background is not fintech-first. It is trust-first: healthcare operations, regulated systems, and products where unclear information slows someone down or creates avoidable risk.",
    ],
    proofPoints: [
      { stat: "20%", detail: "Organization-wide EMR cost reduction; I initiated a regulated healthcare workflow redesign that contributed inside a larger initiative" },
      { stat: "70%", detail: "Every CPR certification collected 70% ahead of a deadline that was about to slip, after I rewrote the technical/legal material for the clinicians completing it" },
      { stat: "85%", detail: "Shorter medical resupply time after operational tracking improvements" },
      { stat: "60%", detail: "Reduced medical logistics spending through better visibility and coordination" },
    ],
    featuredWork: [
      {
        title: "MSK workflow redesign",
        reason: "Regulated systems and measurable internal workflow outcomes.",
      },
      {
        title: "Mobbin",
        reason: "Design-system and pattern fluency.",
      },
      {
        title: "Grove AI",
        reason: "AI curiosity and prototype/product exploration, clearly labeled.",
      },
    ],
    strengths: [
      "Design for confidence before action, especially when information carries risk",
      "Regulated-systems judgment from healthcare and military contexts, applied to product decisions",
      "Research and product patterns that clarify flows, states, hierarchy, and next steps",
      "Understands why design systems matter for complex products that need coherence over time",
    ],
    relevantExperience: [
      "My healthcare and military background isn't a substitute for fintech experience, but it is strong evidence of regulated-systems judgment. I have worked in contexts where clarity, trust, status, and role-based decisions mattered.",
      "For Lumin Digital, I'd foreground MSK, Mobbin, and Grove: measurable workflow redesign, pattern fluency, and product decisions grounded in clarity for coherent digital systems.",
    ],
    keywords: [
      "product design",
      "fintech",
      "digital banking",
      "regulated systems",
      "design systems",
      "user research",
      "trust",
      "workflow clarity",
      "mobile UX",
      "AI curiosity",
    ],
    hiringManagerNote:
      "I'd position my healthcare and military background as evidence of regulated-systems judgment, not as a substitute for fintech experience.",
    closing:
      "For Lumin Digital, I'd bring product design discipline, workflow clarity, and a strong systems lens to digital banking experiences.",
    supportLinks: [
      {
        label: "MSK case study",
        path: "/case-study/msk",
        description: "Regulated systems, workflow redesign, and measurable outcomes.",
        icon: <MedicalCrossIcon />,
      },
      {
        label: "Mobbin case study",
        path: "/case-study/mobbin",
        description: "Pattern fluency, design-system thinking, and interface documentation.",
        icon: <PencilIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "CompanyCam Product Designer",
        path: "/curated/companycam-product-designer-field-workflows",
        description: "Adjacent product design for real-world workflows.",
        icon: <HandIcon />,
      },
      {
        label: "Main portfolio",
        path: "/",
        description: "Full UX/product portfolio and contact section.",
        icon: <LaunchIcon />,
      },
    ],
  },
  "fashion-graphic-designer": {
    slug: "fashion-graphic-designer",
    company: "Manière De Voir",
    accent: "#7A1F38",
    accentDark: "#db7f96",
    mapSrc: "/riso/elevation-01.jpg",
    edition: "mdv",
    role: "Graphic Designer",
    variant: "fashion",
    badgeLabel: "Fashion graphic design view",
    eyebrow: "Graphic design · campaign systems · ecommerce · elevated production craft",
    headline: "Hands-on visual design for campaign, ecommerce, social, and brand systems",
    subhead:
      "Refined layout, campaign hierarchy, digital-first assets, production discipline, and the ability to partner across marketing, production, design, and development.",
    meta: [
      { label: "Target role", value: "Graphic Designer · Fashion/Lifestyle" },
      { label: "Craft focus", value: "Layout, typography, campaign systems, production quality" },
      { label: "Tools", value: "Figma + Adobe Creative Suite alignment" },
      { label: "Best fit", value: "Digital, ecommerce, social, email, lookbook, and launch support" },
    ],
    intro: [
      "My main portfolio is not a traditional fashion book, so I wouldn't position myself as someone with years of fashion-house experience. The honest fit is hands-on graphic design work that needs clean hierarchy, strong typography, elevated digital execution, and careful production across channels.",
      "What maps directly to this role is the way I work: I can take a direction, structure the visual system, create polished layouts, iterate quickly, and keep output consistent across ecommerce, social, email, presentation, and campaign surfaces. My UX background is also useful here because the role asks for digitally forward brand work that has to perform, not just look good.",
    ],
    proofPoints: [
      { stat: "200+", detail: "Screens captured and quality-checked for visual clarity, sequencing, completeness, and production accuracy during Mobbin freelance work" },
      { stat: "3", detail: "Live finance apps studied for layout systems, navigation models, hierarchy, and reusable interface behavior" },
      { stat: "34", detail: "Grove survey respondents informing visual tone, feature hierarchy, and digitally forward product direction" },
    ],
    featuredWork: [
      {
        title: "Grove visual system",
        reason: "Best evidence of mood, color restraint, product polish, type hierarchy, and mobile-first visual execution.",
      },
      {
        title: "Mobbin UX flow documentation",
        reason: "Shows production accuracy, attention to detail, visual pattern recognition, and the discipline to audit complete digital experiences.",
      },
      {
        title: "MDV-focused visual direction exercise",
        reason: "A focused speculative section on this page showing campaign, ecommerce, social/email, lookbook, and launch-system thinking.",
      },
    ],
    strengths: [
      "Clean layout systems that scale across campaign, ecommerce, social, email, and presentation assets",
      "Hierarchy, spacing, type, and image placement that make content feel elevated and easy to scan",
      "Can work from brand or seasonal direction, explore options, and adapt to feedback without losing craft quality",
      "Production discipline: details, accuracy, naming, handoff, versioning, and repeatable systems",
      "Strong fit for digital campaign assets, ecommerce modules, and lookbook layouts",
    ],
    relevantExperience: [
      "My Mobbin freelance work required careful screen capture, sequencing, review, and taxonomy alignment. That translates directly to graphic design production work where precision, naming, consistency, completeness, and quality control matter.",
      "Grove shows the visual-design side: creating hierarchy, choosing what should lead, reducing clutter, and making digital content feel trustworthy, polished, and easy to act on.",
      "My UX background gives me an advantage on ecommerce, email, and digital campaign assets because I think about how a visual decision affects attention, click behavior, comprehension, and brand perception.",
    ],
    keywords: [
      "graphic design",
      "fashion",
      "luxury",
      "lifestyle",
      "campaign design",
      "art direction",
      "editorial layout",
      "social assets",
      "email design",
      "ecommerce content",
      "collection launches",
      "lookbooks",
      "print collateral",
      "event branding",
      "packaging",
      "brand systems",
      "production design",
      "visual hierarchy",
      "Figma",
      "Adobe Creative Suite",
      "Photoshop",
      "InDesign",
      "Illustrator",
    ],
    hiringManagerNote:
      "I'm not asking you to read me as a traditional fashion art director. I'm strongest as a precise, hands-on visual designer who can support elevated digital, campaign, ecommerce, and production work with strong layout discipline and UX-aware judgment.",
    closing:
      "For Manière De Voir's Graphic Designer role, I'd bring polished layout judgment, production reliability, digital UX awareness, and the ability to translate creative direction into consistent assets across channels.",
    supportLinks: [
      {
        label: "Grove case study",
        path: "/case-study/grove",
        description: "Visual system, mobile composition, tone, and polished product screens.",
        icon: <SproutIcon />,
      },
      {
        label: "Mobbin case study",
        path: "/case-study/mobbin",
        description: "Production accuracy, visual pattern recognition, and UI documentation.",
        icon: <PencilIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "Main portfolio",
        path: "/",
        description: "Full UX/product portfolio and contact section.",
        icon: <LaunchIcon />,
      },
    ],
  },
};

// Removed from the exported role collection after direct listing checks:
// EnergyCAP and CompanyCam were removed on 2026-07-29. Lumin Digital's exact
// Product Designer requisition began returning HTTP 404 on 2026-08-03.
// Keeping the source definitions here makes the decision easy to reverse.
const archivedCuratedSlugs = new Set([
  "energycap-ux-ai-prototyping-data-products",
  "companycam-product-designer-field-workflows",
  "lumin-digital-product-designer-fintech-systems",
]);

const isArchivedCuratedPath = (path: string) => {
  const curatedPathPrefix = "/curated/";
  return (
    path.startsWith(curatedPathPrefix) &&
    archivedCuratedSlugs.has(path.slice(curatedPathPrefix.length))
  );
};

export const curatedPages: Record<string, CuratedPage> = Object.fromEntries(
  Object.entries(allCuratedPages)
    .filter(([slug]) => !archivedCuratedSlugs.has(slug))
    .map(([slug, page]) => [
      slug,
      {
        ...page,
        relatedLinks: page.relatedLinks.filter(
          (link) => !isArchivedCuratedPath(link.path),
        ),
      },
    ]),
);
