import React from "react";
import type { ReactNode } from "react";
import {
  HandIcon,
  LaunchIcon,
  MagnifierIcon,
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
  badgeLabel: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  meta: Array<{ label: string; value: string }>;
  intro: string[];
  proofPoints: Array<{ stat: string; detail: string }>;
  featuredWork: Array<{ title: string; reason: string }>;
  strengths: string[];
  relevantExperience: string[];
  keywords: string[];
  hiringManagerNote: string;
  closing: string;
  supportLinks: CuratedLink[];
  relatedLinks: CuratedLink[];
};

export const curatedPages: Record<string, CuratedPage> = {
  "omada-staff-product-designer-healthcare-ai": {
    slug: "omada-staff-product-designer-healthcare-ai",
    company: "Omada Health",
    role: "Staff Product Designer",
    variant: "care",
    badgeLabel: "Healthcare product view",
    eyebrow: "Complex systems UX · internal tools · healthcare product thinking",
    headline: "Designing trusted tools for complex healthcare workflows",
    subhead:
      "I am a UX and product designer with an MHA and healthcare operations depth, focused on reducing friction in clinical and operational work without losing clarity or trust.",
    meta: [
      { label: "Focus", value: "Complex systems UX" },
      { label: "Strength", value: "Internal tools + product judgment" },
      { label: "Evidence", value: "21K+ clinicians and staff, 20% cost reduction, 70% efficiency gain" },
      { label: "Best fit", value: "High-stakes internal tools and healthcare workflows" },
    ],
    intro: [
      "My strongest product work starts with how care and operations actually run: where teams slow down, where handoffs break, and where the system asks too much of the people using it. I bring healthcare operations, UX research, internal tools, and product judgment together to make those moments clearer and easier to act on.",
      "I do not treat healthcare like generic SaaS. I understand the pressure behind clinical and operational work, and I design with that reality in mind so products support better decisions, smoother coordination, and more usable day-to-day workflows.",
    ],
    proofPoints: [
      { stat: "21K+", detail: "Clinicians and administrative staff affected by workflow redesign work at Memorial Sloan Kettering" },
      { stat: "20%", detail: "Organization-wide EMR cost reduction; I led the workflow redesign that contributed to it" },
      { stat: "70%", detail: "Certification workflow efficiency gain through simplification and visibility improvements" },
    ],
    featuredWork: [
      {
        title: "MSK internal tools and workflow redesign",
        reason: "Shows direct healthcare credibility, operational context, and measurable impact at scale.",
      },
      {
        title: "Certification and onboarding workflow redesign",
        reason: "Demonstrates role-based workflows, cross-functional coordination, and reduction of product friction.",
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
      "Turns operational pain points into clearer product direction",
      "Brings healthcare context that shortens the learning curve on real care workflows",
      "Works comfortably across research, internal tools, and product execution",
      "Improves usability without losing operational rigor or trust",
    ],
    relevantExperience: [
      "At Memorial Sloan Kettering, I worked inside healthcare operations before moving into UX and internal tools work. That combination gives me unusually strong context for designing systems that need to work for real staff under pressure, not just in polished demos.",
      "As an Army medical logistics officer, I also led process and tracking improvements where reliability and speed had direct consequences. That experience sharpened how I think about handoffs, failure points, and decision support inside complex systems.",
    ],
    keywords: [
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
      "If your team needs a designer who can connect healthcare context, product judgment, and measurable systems improvement, this is the clearest view of what I would bring.",
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
        label: "JPM Service Design VP",
        path: "/curated/jpm-service-design-vp-systems",
        description: "Adjacent regulated-systems narrative with stronger service-design emphasis.",
        icon: <HandIcon />,
      },
      {
        label: "JPM Design Strategy VP",
        path: "/curated/jpm-design-strategy-vp-service-ops",
        description: "Operator-to-strategy framing for structured decision-making work.",
        icon: <TerminalIcon />,
      },
    ],
  },
  "jpm-service-design-vp-systems": {
    slug: "jpm-service-design-vp-systems",
    company: "JPMorgan Chase",
    role: "Service Design Vice President",
    variant: "finance",
    badgeLabel: "Enterprise service view",
    eyebrow: "Service design · regulated systems · journey and orchestration work",
    headline: "Designing better services where handoffs, trust, and execution all matter",
    subhead:
      "I use service design, research, and process improvement to make multi-step services easier to understand, easier to run, and less likely to break across teams.",
    meta: [
      { label: "Focus", value: "Service blueprinting and workflow orchestration" },
      { label: "Strength", value: "Regulated systems and cross-functional alignment" },
      { label: "Evidence", value: "70% workflow gain, 20% cost reduction, 85% speed improvement" },
      { label: "Best fit", value: "Service-heavy enterprise transformation work" },
    ],
    intro: [
      "What fits here is not industry sameness but problem similarity: fragmented journeys, operational dependencies, and the cost of service breakdowns across teams. My background in healthcare operations and military logistics gives me a practical approach to service design work where coordination quality matters.",
      "I am not selling myself as a banking insider. I am selling a service-design practice built around mapping handoffs, finding failure points, and helping teams build services that run more coherently from end to end.",
    ],
    proofPoints: [
      { stat: "70%", detail: "Certification workflow efficiency gain through simplification and visibility improvements" },
      { stat: "20%", detail: "Organization-wide EMR cost reduction; I led the workflow redesign that contributed to it" },
      { stat: "85%", detail: "Medical resupply speed improvement across seven aid stations using better tracking and process structure" },
    ],
    featuredWork: [
      {
        title: "Certification workflow redesign",
        reason: "Strongest example of service blueprinting, handoff improvement, and operational simplification.",
      },
      {
        title: "MSK internal tools and EMR redesign",
        reason: "Adds regulated-system complexity and cross-functional coordination in a high-trust environment.",
      },
      {
        title: "Medical logistics transformation",
        reason: "Shows orchestration, execution discipline, and systems reliability under pressure.",
      },
    ],
    strengths: [
      "Finds service breakdowns across teams, channels, and operating steps",
      "Brings a service-design lens grounded in real delivery constraints",
      "Works well on systems where trust depends on consistency, not just UX polish",
      "Connects people, process, and tools into clearer operating models",
    ],
    relevantExperience: [
      "My work has consistently involved improving systems that depend on coordination across people, tools, and process constraints. In healthcare and logistics, I learned to diagnose failure points, align stakeholders, and redesign journeys so the service works more reliably from end to end.",
    ],
    keywords: [
      "service blueprinting",
      "journey mapping",
      "systems thinking",
      "workflow design",
      "trust",
      "cross-functional collaboration",
      "stakeholder alignment",
      "process improvement",
      "accessibility",
    ],
    hiringManagerNote:
      "My strongest service-design work starts where fragmented systems create avoidable friction for both customers and teams.",
    closing:
      "For service-design roles focused on broken journeys, cross-team friction, and more coherent execution, this page shows the value I would bring.",
    supportLinks: [
      {
        label: "MSK case study",
        path: "/case-study/msk",
        description: "Regulated systems, workflow redesign, and stakeholder-heavy improvement work.",
        icon: <MedicalCrossIcon />,
      },
      {
        label: "Good Harvest case study",
        path: "/case-study/good-harvest",
        description: "Customer journey diagnosis through iterative research and testing.",
        icon: <MagnifierIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "Omada Staff Product Designer",
        path: "/curated/omada-staff-product-designer-healthcare-ai",
        description: "Healthcare-first page and strongest direct domain match.",
        icon: <MedicalCrossIcon />,
      },
      {
        label: "JPM Design Strategy VP",
        path: "/curated/jpm-design-strategy-vp-service-ops",
        description: "Operator-to-strategy framing for structured decision-making work.",
        icon: <TerminalIcon />,
      },
    ],
  },
  "jpm-ux-design-lead-vp-workflows": {
    slug: "jpm-ux-design-lead-vp-workflows",
    company: "JPMorgan Chase",
    role: "UX Design Lead, Vice President",
    variant: "finance",
    badgeLabel: "Workflow design view",
    eyebrow: "Enterprise UX · internal tools · discovery to delivery",
    headline: "Improving internal tools so people can move faster and make fewer mistakes",
    subhead:
      "I bring a workflow-first UX approach shaped by internal tools, clinical operations, and process redesign in environments where usability affects throughput and accuracy.",
    meta: [
      { label: "Focus", value: "Internal tools and workflow simplification" },
      { label: "Strength", value: "Discovery, facilitation, and delivery discipline" },
      { label: "Evidence", value: "21K+ staff impact, 20% EMR cost reduction, 70% efficiency gain" },
      { label: "Best fit", value: "Enterprise UX for complex internal products" },
    ],
    intro: [
      "This page is about internal-product UX, not consumer-finance styling. My work fits best where teams need someone who can understand dense business processes, simplify the experience, and carry those decisions through delivery with clear rationale.",
      "The value I bring is straightforward: I help teams make internal tools easier to learn, easier to use, and easier to complete accurately when the work itself is already demanding.",
    ],
    proofPoints: [
      { stat: "21K+", detail: "Clinicians and staff affected by workflow redesign work at Memorial Sloan Kettering" },
      { stat: "20%", detail: "Organization-wide EMR cost reduction; I led the workflow redesign that contributed to it" },
      { stat: "70%", detail: "Certification workflow efficiency gain supported by onboarding and process improvements" },
    ],
    featuredWork: [
      {
        title: "Internal tools UX research and redesign",
        reason: "Best match for discovery, facilitation, and workflow simplification in complex environments.",
      },
      {
        title: "Onboarding redesign",
        reason: "Supports information hierarchy, comprehension, and adoption across operational users.",
      },
      {
        title: "Certification and EMR redesign",
        reason: "Shows delivery work inside constrained and regulated systems.",
      },
    ],
    strengths: [
      "Turns dense internal processes into more usable product flows",
      "Uses research and task analysis to improve throughput and accuracy",
      "Aligns stakeholders around clearer, more practical UX decisions",
      "Best in internal tools environments where usability affects business performance",
    ],
    relevantExperience: [
      "At Memorial Sloan Kettering, I supported internal tools and workflow improvements by combining research, task analysis, and process redesign. My operations background means I read workflow complexity as a design problem, not just a business constraint.",
    ],
    keywords: [
      "UX research",
      "discovery",
      "complex workflows",
      "stakeholder alignment",
      "delivery",
      "information hierarchy",
      "iterative prototyping",
      "internal tools",
      "accessibility",
    ],
    hiringManagerNote:
      "I work best on internal products where better UX improves speed, accuracy, and day-to-day decision quality.",
    closing:
      "For teams hiring into workflow-heavy enterprise UX, this page shows how I can help make internal tools more usable, more efficient, and easier to adopt.",
    supportLinks: [
      {
        label: "MSK case study",
        path: "/case-study/msk",
        description: "Internal tools, research, onboarding, and workflow redesign in a regulated setting.",
        icon: <MedicalCrossIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "JPM Service Design VP",
        path: "/curated/jpm-service-design-vp-systems",
        description: "Stronger adjacent page if the role leans more service-design than craft-heavy UX.",
        icon: <HandIcon />,
      },
      {
        label: "Omada Staff Product Designer",
        path: "/curated/omada-staff-product-designer-healthcare-ai",
        description: "Sharper healthcare and workflow fit if domain resonance is the priority.",
        icon: <MedicalCrossIcon />,
      },
    ],
  },
  "jpm-design-strategy-vp-service-ops": {
    slug: "jpm-design-strategy-vp-service-ops",
    company: "JPMorgan Chase",
    role: "Design Strategy, Vice President",
    variant: "finance",
    badgeLabel: "Strategy view",
    eyebrow: "Design strategy · service design · measurable process change",
    headline: "Turning ambiguous operating problems into clearer decisions and measurable change",
    subhead:
      "I combine service design, operational leadership, and research-informed problem solving to help teams frame tradeoffs, align faster, and improve how the system works.",
    meta: [
      { label: "Focus", value: "Design strategy and service design" },
      { label: "Strength", value: "Operational problem framing and measurable outcomes" },
      { label: "Evidence", value: "20% cost reduction, 70% efficiency gain, 85% speed improvement" },
      { label: "Best fit", value: "Strategy work tied to real implementation" },
    ],
    intro: [
      "This is the clearest role for the operator-designer side of my background. The value is practical: I help teams structure ambiguity, surface tradeoffs, and move from analysis to measurable change.",
      "I am not trying to imitate a long-tenure banking or consulting profile. What I bring is grounded experience across operations, UX, and workflow redesign, with a track record of turning recommendations into working systems.",
    ],
    proofPoints: [
      { stat: "20%", detail: "Organization-wide EMR cost reduction; I led the workflow redesign that contributed to it" },
      { stat: "70%", detail: "Certification workflow efficiency gain through simplification and visibility" },
      { stat: "85%", detail: "Medical resupply speed improvement using better tracking and system structure" },
      { stat: "21K+", detail: "Clinical and administrative staff reached by internal workflow improvement work" },
    ],
    featuredWork: [
      {
        title: "EMR and certification workflow redesign",
        reason: "Best evidence for structured problem solving, tradeoffs, and measurable outcomes.",
      },
      {
        title: "Medical logistics systems improvement",
        reason: "Supports ambiguity management, operating discipline, and execution under constraints.",
      },
      {
        title: "Internal tools research and redesign",
        reason: "Adds user-centered discovery and cross-functional problem framing.",
      },
    ],
    strengths: [
      "Frames messy operational problems in a way teams can act on",
      "Bridges service design thinking with execution-minded decision making",
      "Facilitates across stakeholders with different incentives and constraints",
      "Best suited for strategy work that needs to lead to real implementation",
    ],
    relevantExperience: [
      "My background is useful for design strategy work because it is grounded in both analysis and implementation. I have worked inside clinical operations, supported UX and internal-tool redesign, and led logistics improvements where recommendations had to become working systems, not just presentation material.",
    ],
    keywords: [
      "design strategy",
      "service design",
      "journey mapping",
      "workshops",
      "tradeoffs",
      "measurable outcomes",
      "risk",
      "operations",
      "stakeholder alignment",
      "rapid experimentation",
    ],
    hiringManagerNote:
      "I am most useful when a team needs sharper framing, better tradeoff decisions, and a path from ambiguity to execution.",
    closing:
      "For strategy-oriented roles, this page shows the kind of value I bring best: clearer framing, better decisions, and measurable follow-through.",
    supportLinks: [
      {
        label: "MSK case study",
        path: "/case-study/msk",
        description: "Evidence of structured redesign inside a regulated, stakeholder-heavy environment.",
        icon: <MedicalCrossIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "JPM Service Design VP",
        path: "/curated/jpm-service-design-vp-systems",
        description: "Better fit if the conversation leans toward blueprinting and service orchestration.",
        icon: <HandIcon />,
      },
      {
        label: "Omada Staff Product Designer",
        path: "/curated/omada-staff-product-designer-healthcare-ai",
        description: "Stronger if healthcare domain fit matters more than enterprise-strategy adjacency.",
        icon: <LaunchIcon />,
      },
    ],
  },
  "pogo-product-designer-ai-data-workflows": {
    slug: "pogo-product-designer-ai-data-workflows",
    company: "Pogo",
    role: "Product Designer",
    variant: "finance",
    badgeLabel: "AI data workflow view",
    eyebrow: "Product design · AI-enabled data · consumer and B2B workflows",
    headline: "Product design for AI-enabled data workflows people can actually trust",
    subhead:
      "I design product experiences that make complex information easier to understand, act on, and improve, with a background spanning healthcare systems, military logistics, mobile pattern analysis, and AI-assisted product exploration.",
    meta: [
      { label: "Focus", value: "AI-enabled data clarity" },
      { label: "Strength", value: "Workflow, trust, and mobile pattern judgment" },
      { label: "Evidence", value: "85% faster resupply, 70% workflow gain, 20% cost reduction" },
      { label: "Best fit", value: "Consumer and B2B products with complex data decisions" },
    ],
    intro: [
      "Pogo's product challenge is not just making data visible. It is making data useful across a consumer app, a B2B platform, and AI-enabled technology that depends on trust.",
      "My strongest work lives in that overlap: user motivation, system clarity, workflow behavior, and product decisions that reduce friction without flattening complexity.",
    ],
    proofPoints: [
      { stat: "20%", detail: "Organization-wide EMR cost reduction at Memorial Sloan Kettering; I led the workflow redesign that contributed to it" },
      { stat: "70%", detail: "Efficiency gain in physician certification collection through clearer workflow structure" },
      { stat: "85%", detail: "Faster medical resupply after improving tracking and communication workflows across distributed teams" },
    ],
    featuredWork: [
      {
        title: "Grove AI",
        reason: "Leads with AI-enabled workflow judgment, trust states, and product exploration.",
      },
      {
        title: "Mobbin",
        reason: "Shows mobile pattern fluency, hierarchy, flows, and current product taste.",
      },
      {
        title: "Good Harvest",
        reason: "Shows research-led product decisions and user motivation.",
      },
      {
        title: "MSK workflow redesign",
        reason: "Closes with measurable workflow credibility and complex systems proof.",
      },
    ],
    strengths: [
      "Turns messy product information into clearer decisions and next steps",
      "Brings mobile product pattern fluency from ongoing Mobbin analysis work",
      "Designs with AI trust, uncertainty, and data legibility in mind",
      "Works well in ambiguous product spaces where the system is still being shaped",
    ],
    relevantExperience: [
      "My healthcare and military work trained me to design around data that cannot simply be decorative. The interface has to help someone understand status, risk, next steps, and what information is still missing.",
      "Grove, Good Harvest, and Mobbin show the current product-design side of that background: AI-assisted product exploration, user research, mobile pattern analysis, and product decisions grounded in clarity rather than surface polish.",
    ],
    keywords: [
      "product design",
      "AI-enabled workflows",
      "data clarity",
      "consumer app",
      "B2B platform",
      "mobile UX",
      "trust",
      "research synthesis",
      "startup ambiguity",
      "interaction design",
    ],
    hiringManagerNote:
      "I am strongest when a product has to make messy data, workflows, or decisions feel simple enough to use without hiding the complexity that matters.",
    closing:
      "For Pogo, I would bring a product designer's eye, an operator's tolerance for ambiguity, and a strong bias toward interfaces that help people understand what to do next.",
    supportLinks: [
      {
        label: "Grove case study",
        path: "/case-study/grove",
        description: "AI-enabled product exploration, trust states, and prototype thinking.",
        icon: <SproutIcon />,
      },
      {
        label: "Mobbin case study",
        path: "/case-study/mobbin",
        description: "Mobile pattern fluency, interface hierarchy, and product-analysis rigor.",
        icon: <PencilIcon />,
      },
      {
        label: "Good Harvest case study",
        path: "/case-study/good-harvest",
        description: "Research-led product direction and user motivation.",
        icon: <MagnifierIcon />,
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
      "Spring Health is asking for more than a chat interface. This role requires intent architecture, system prompt thinking, release rigor, quality evaluation, clinical collaboration, and reusable AI interaction patterns.",
      "My strongest fit is the combination of healthcare systems experience, AI product exploration, and workflow design under real constraints.",
    ],
    proofPoints: [
      { stat: "MSK", detail: "Healthcare systems experience across clinical operations, training, implementation, and workflow redesign" },
      { stat: "20%", detail: "Organization-wide EMR cost reduction; I led the healthcare workflow redesign that contributed to it" },
      { stat: "70%", detail: "Certification workflow efficiency gain through simplification and visibility improvements" },
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
      {
        title: "Good Harvest",
        reason: "Supports research synthesis, product clarity, and user-centered decision making.",
      },
    ],
    strengths: [
      "Frames AI quality through intent, boundaries, feedback, evaluation, and reuse",
      "Brings healthcare fluency that reduces ramp time on clinical and care-team workflows",
      "Designs for escalation, uncertainty, human override, and trust instead of treating AI as magic",
      "Can connect AI interaction patterns to reusable product and design-system decisions",
    ],
    relevantExperience: [
      "At Memorial Sloan Kettering, I worked close to healthcare operations and internal workflow improvement. That context matters for AI interaction design because the stakes are not only task completion; they include trust, escalation, appropriateness, and the human decision that follows the interface.",
      "Grove AI is the clearest current artifact for my AI product direction: intent mapping, prompt-assisted prototyping, trust states, and human fallback judgment. I would present it as focused AI product exploration, not as a shipped clinical AI product.",
    ],
    keywords: [
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
      "I am not trying to look like an AI researcher. I am positioning as a designer who can make AI experiences safer, clearer, and more useful inside healthcare workflows.",
    closing:
      "For Spring Health, I would bring healthcare fluency, AI interaction judgment, and the calm systems thinking needed to design for people who may be navigating vulnerable moments.",
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
      { label: "Evidence", value: "Grove AI, Good Harvest research, MSK systems thinking" },
      { label: "Best fit", value: "Complex data workflows that need practical UX judgment" },
    ],
    intro: [
      "EnergyCAP is not asking for static screens. The role calls for a designer who can research, prototype, collaborate with engineering, and judge what belongs in a working product.",
      "My strongest fit is the bridge between user needs, operational complexity, data-heavy workflows, and prototype discipline.",
    ],
    proofPoints: [
      { stat: "20%", detail: "Organization-wide EMR cost reduction at MSK; I led the workflow redesign that contributed to it" },
      { stat: "70%", detail: "Physician certification workflow efficiency gain through simplification and visibility" },
      { stat: "85%", detail: "Faster medical resupply after building tracking and reporting workflows" },
      { stat: "60%", detail: "Reduced medical logistics spending through better visibility and process structure" },
    ],
    featuredWork: [
      {
        title: "Grove AI",
        reason: "AI-assisted product/prototype exploration and trust-state thinking.",
      },
      {
        title: "Good Harvest",
        reason: "Research synthesis, user needs, and product prioritization.",
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
      "Moves from user need to testable interaction without losing problem clarity",
      "Uses AI-assisted prototyping as a way to learn faster, not as a substitute for UX judgment",
      "Considers accessibility, edge cases, and engineering handoff before treating prototypes as production-ready",
      "Comfortable with operational and data-heavy product contexts where clarity matters",
    ],
    relevantExperience: [
      "My work has consistently involved making operational data easier to understand and act on. In healthcare and medical logistics, that meant clarifying workflows, status, responsibility, and the next action under real constraints.",
      "For EnergyCAP, I would translate that into sustainability and energy data: research what users actually need to decide, prototype just enough to test the interaction, and partner with engineering on what can become real.",
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
      "I am strongest when I can move from research to working artifact without losing the user's actual need in the process.",
    closing:
      "For EnergyCAP, I would bring a practical, evidence-led UX approach to complex sustainability and energy data workflows.",
    supportLinks: [
      {
        label: "Grove case study",
        path: "/case-study/grove",
        description: "AI-assisted product exploration and prototype thinking.",
        icon: <SproutIcon />,
      },
      {
        label: "Good Harvest case study",
        path: "/case-study/good-harvest",
        description: "Research synthesis, user motivation, and product prioritization.",
        icon: <MagnifierIcon />,
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
        label: "Pogo Product Designer",
        path: "/curated/pogo-product-designer-ai-data-workflows",
        description: "Adjacent AI-enabled data and consumer/B2B workflow framing.",
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
      { label: "Evidence", value: "7 aid stations, $2M managed, 85% faster resupply" },
      { label: "Best fit", value: "Tools for teams doing real work under real constraints" },
    ],
    intro: [
      "CompanyCam's users are doing work in the real world, not in a clean dashboard fantasy. Product design has to respect time pressure, context switching, information capture, team coordination, and clear handoffs.",
      "My background gives me unusually direct experience with those realities across healthcare operations, military medical logistics, mobile product pattern analysis, and AI-assisted workflow exploration.",
    ],
    proofPoints: [
      { stat: "7", detail: "Aid stations coordinated through tracking and communication workflows across three countries" },
      { stat: "$2M", detail: "Medical supplies and equipment managed while improving visibility, reporting, and coordination" },
      { stat: "85%", detail: "Faster resupply after improving field workflow visibility and handoffs" },
      { stat: "70%", detail: "Certification workflow efficiency gain at MSK through clearer process structure" },
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
      "Designs for capture, context, state, trust, and speed in workflows that happen outside ideal conditions",
      "Understands how unclear handoffs create immediate downstream consequences",
      "Brings mobile pattern fluency and product-system awareness from ongoing Mobbin analysis",
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
      "I am not coming from construction tech, but I am coming from environments where broken workflows, missing information, and unclear handoffs have immediate consequences.",
    closing:
      "For CompanyCam, I would bring workflow depth, mobile pattern fluency, and a practical product-design approach to tools built for people doing real work.",
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
        label: "Pogo Product Designer",
        path: "/curated/pogo-product-designer-ai-data-workflows",
        description: "Adjacent consumer/B2B product and AI-enabled data framing.",
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
      { label: "Evidence", value: "MSK, Good Harvest, Mobbin, Grove AI" },
      { label: "Best fit", value: "Digital banking experiences that need trust and coherence" },
    ],
    intro: [
      "Digital banking products need users to understand status, options, risk, and next steps without friction.",
      "My background is not fintech-first, but it is trust-first: healthcare operations, regulated systems, complex workflows, and product experiences where unclear information slows people down or creates avoidable risk.",
    ],
    proofPoints: [
      { stat: "20%", detail: "Organization-wide EMR cost reduction; I led the regulated healthcare workflow redesign that contributed to it" },
      { stat: "70%", detail: "Certification workflow efficiency gain through clearer process and visibility" },
      { stat: "85%", detail: "Faster medical resupply after operational tracking improvements" },
      { stat: "60%", detail: "Reduced medical logistics spending through better visibility and coordination" },
    ],
    featuredWork: [
      {
        title: "MSK workflow redesign",
        reason: "Regulated systems and measurable internal workflow outcomes.",
      },
      {
        title: "Good Harvest",
        reason: "Research, user needs, and product clarity.",
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
      "Designs for confidence before action, especially when information carries risk",
      "Translates regulated-systems judgment from healthcare and military contexts into product decisions",
      "Uses research and product patterns to clarify flows, states, hierarchy, and next steps",
      "Understands why design systems matter for complex products that need coherence over time",
    ],
    relevantExperience: [
      "My healthcare and military background is not a substitute for fintech experience, but it is strong evidence of regulated-systems judgment. I have worked in contexts where clarity, trust, status, and role-based decisions mattered.",
      "For Lumin Digital, I would foreground MSK, Good Harvest, and Mobbin: measurable workflow redesign, research-led product decisions, and pattern fluency for coherent digital systems.",
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
      "I would position my healthcare and military background as evidence of regulated-systems judgment, not as a substitute for fintech experience.",
    closing:
      "For Lumin Digital, I would bring product design discipline, workflow clarity, and a strong systems lens to digital banking experiences.",
    supportLinks: [
      {
        label: "MSK case study",
        path: "/case-study/msk",
        description: "Regulated systems, workflow redesign, and measurable outcomes.",
        icon: <MedicalCrossIcon />,
      },
      {
        label: "Good Harvest case study",
        path: "/case-study/good-harvest",
        description: "Research-led product direction and user-centered iteration.",
        icon: <MagnifierIcon />,
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
        label: "JPM UX Design Lead VP",
        path: "/curated/jpm-ux-design-lead-vp-workflows",
        description: "Adjacent enterprise UX and regulated workflow framing.",
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
    role: "Graphic Designer",
    variant: "fashion",
    badgeLabel: "Fashion graphic design view",
    eyebrow: "Graphic design · campaign systems · ecommerce · elevated production craft",
    headline: "Hands-on visual design for campaign, ecommerce, social, and brand systems",
    subhead:
      "This tailored page reframes my portfolio for Manière De Voir's Graphic Designer role: refined layout, campaign hierarchy, digital-first assets, production discipline, and the ability to partner across marketing, production, design, and development.",
    meta: [
      { label: "Target role", value: "Graphic Designer · Fashion/Lifestyle" },
      { label: "Craft focus", value: "Layout, typography, campaign systems, production quality" },
      { label: "Tools", value: "Figma + Adobe Creative Suite alignment" },
      { label: "Best fit", value: "Digital, ecommerce, social, email, lookbook, and launch support" },
    ],
    intro: [
      "My main portfolio is not a traditional fashion book, so I would not position myself as someone with years of fashion-house experience. The honest fit is hands-on graphic design work that needs clean hierarchy, strong typography, elevated digital execution, and careful production across channels.",
      "What maps directly to this role is the way I work: I can take a direction, structure the visual system, create polished layouts, iterate quickly, and keep output consistent across ecommerce, social, email, presentation, and campaign surfaces. My UX background is also useful here because the role asks for digitally forward brand work that has to perform, not just look good.",
    ],
    proofPoints: [
      { stat: "200+", detail: "Screens captured and quality-checked for visual clarity, sequencing, completeness, and production accuracy during Mobbin freelance work" },
      { stat: "3", detail: "Production products studied for layout systems, navigation models, hierarchy, and reusable interface behavior" },
      { stat: "22", detail: "Good Harvest test participants; heatmaps informed CTA hierarchy, layout clarity, and content emphasis" },
      { stat: "32", detail: "Grove survey respondents informing visual tone, feature hierarchy, and digitally forward product direction" },
    ],
    featuredWork: [
      {
        title: "Grove visual system",
        reason: "Best evidence of mood, color restraint, product polish, type hierarchy, and mobile-first visual execution.",
      },
      {
        title: "Good Harvest before/final layouts",
        reason: "Shows visual iteration, CTA emphasis, hierarchy, and the ability to improve marketing effectiveness through layout.",
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
      "Builds clean layout systems that can scale across campaign, ecommerce, social, email, and presentation assets",
      "Uses hierarchy, spacing, type, and image placement to make content feel elevated and easy to scan",
      "Can work from brand or seasonal direction, explore options, and adapt to feedback without losing craft quality",
      "Brings production discipline: details, accuracy, naming, handoff, versioning, and repeatable systems",
      "Strong fit for digital campaign assets, collection launch support, ecommerce modules, email layouts, social crops, lookbook layouts, and brand-system production",
    ],
    relevantExperience: [
      "My Mobbin freelance work required careful screen capture, sequencing, review, and taxonomy alignment. That translates directly to graphic design production work where precision, naming, consistency, completeness, and quality control matter.",
      "Good Harvest and Grove show the visual-design side: creating hierarchy, choosing what should lead, reducing clutter, and making digital content feel trustworthy, polished, and easy to act on.",
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
      "I am not asking you to read me as a traditional fashion art director. I am strongest as a precise, hands-on visual designer who can support elevated digital, campaign, ecommerce, and production work with strong layout discipline and UX-aware judgment.",
    closing:
      "For Manière De Voir's Graphic Designer role, I would bring polished layout judgment, production reliability, digital UX awareness, and the ability to translate creative direction into consistent assets across channels.",
    supportLinks: [
      {
        label: "Grove case study",
        path: "/case-study/grove",
        description: "Visual system, mobile composition, tone, and polished product screens.",
        icon: <SproutIcon />,
      },
      {
        label: "Good Harvest case study",
        path: "/case-study/good-harvest",
        description: "Before/final layouts, hierarchy, CTA clarity, and visual iteration.",
        icon: <MagnifierIcon />,
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
