import React from "react";
import type { ReactNode } from "react";
import {
  HandIcon,
  LaunchIcon,
  MagnifierIcon,
  MedicalCrossIcon,
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
  variant: "care" | "finance";
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
    eyebrow: "Healthcare systems · workflow design · research-led product thinking",
    headline: "Designing healthcare products that make care operations easier to deliver",
    subhead:
      "I am a UX and product designer with an MHA and healthcare operations depth, focused on reducing friction in clinical and operational work without losing clarity or trust.",
    meta: [
      { label: "Focus", value: "Healthcare workflow design" },
      { label: "Strength", value: "Research + systems thinking" },
      { label: "Evidence", value: "21K+ clinicians, 20% cost reduction, 70% efficiency gain" },
      { label: "Best fit", value: "High-stakes internal and service-heavy products" },
    ],
    intro: [
      "My strongest product work starts with how care and operations actually run: where teams slow down, where handoffs break, and where the system asks too much of the people using it. I bring healthcare operations, UX research, internal tools, and service design together to make those moments clearer and easier to act on.",
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
        reason: "Demonstrates service design, cross-functional coordination, and reduction of process friction.",
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
      "Works comfortably across research, service design, and product execution",
      "Improves usability without losing operational rigor or trust",
    ],
    relevantExperience: [
      "At Memorial Sloan Kettering, I worked inside healthcare operations before moving into UX and internal tools work. That combination gives me unusually strong context for designing systems that need to work for real staff under pressure, not just in polished demos.",
      "As an Army medical logistics officer, I also led process and tracking improvements where reliability and speed had direct consequences. That experience sharpened how I think about handoffs, failure points, and decision support inside complex systems.",
    ],
    keywords: [
      "healthcare",
      "workflow design",
      "service design",
      "research",
      "clinical operations",
      "trust",
      "internal tools",
      "cross-functional collaboration",
      "process improvement",
      "inclusive design",
    ],
    hiringManagerNote:
      "I add the most value when product decisions change how care teams and operational teams actually get work done.",
    closing:
      "If your team needs a designer who can connect healthcare context, product judgment, and measurable workflow improvement, this is the clearest view of what I would bring.",
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
};
