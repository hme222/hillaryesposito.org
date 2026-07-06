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
    headline: "Designing healthcare products that hold up inside real operational complexity",
    subhead:
      "I am a UX and product designer with an MHA and deep healthcare operations experience, focused on making clinical and operational workflows clearer, faster, and easier to trust.",
    meta: [
      { label: "Focus", value: "Healthcare workflow design" },
      { label: "Strength", value: "Research + systems thinking" },
      { label: "Evidence", value: "21K+ clinicians, 20% cost reduction, 70% efficiency gain" },
      { label: "Best fit", value: "High-stakes internal and service-heavy products" },
    ],
    intro: [
      "This role aligns with the part of product design I do best: understanding how work actually happens in care settings, finding where the process breaks down, and designing tools that reduce friction without losing trust. My background spans healthcare operations, UX research, internal tools, and service design, which gives me a practical view of both user needs and system constraints.",
      "I do not approach healthcare as a generic SaaS category. I understand the handoffs, pressure, and tradeoffs behind operational and clinical work, and I know how to translate that reality into clearer experiences, better decision support, and stronger product judgment.",
    ],
    proofPoints: [
      { stat: "21K+", detail: "Clinicians and administrative staff affected by workflow redesign work at Memorial Sloan Kettering" },
      { stat: "20%", detail: "EMR process cost reduction through redesign of a complex operational system" },
      { stat: "70%", detail: "Certification workflow efficiency gain through simplification and visibility improvements" },
      { stat: "25%", detail: "Internal tool task-completion improvement through UX research, usability testing, and task analysis" },
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
      "Deep familiarity with high-stakes workflows where clarity and trust matter",
      "Strong service-design and systems-thinking foundation beyond screen-level UI",
      "Experience translating messy operational reality into usable tools and better process design",
      "Credible bridge between research, workflow redesign, and product decision-making",
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
      "I am strongest in environments where product decisions affect how real operational work gets done, not just how polished the interface looks.",
    closing:
      "If your team is designing for complex care journeys, internal operations, or service-heavy healthcare products, this is the clearest view of how I work and what I would contribute.",
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
    headline: "Designing better services in complex, high-trust operating environments",
    subhead:
      "I design end-to-end workflows for regulated, high-consequence environments, combining service design, research, and process improvement to make complex systems easier to use and easier to trust.",
    meta: [
      { label: "Focus", value: "Service blueprinting and workflow orchestration" },
      { label: "Strength", value: "Regulated systems and cross-functional alignment" },
      { label: "Evidence", value: "70% workflow gain, 20% cost reduction, 85% speed improvement" },
      { label: "Best fit", value: "Service-heavy enterprise transformation work" },
    ],
    intro: [
      "The industry is different from healthcare, but the underlying design challenge is familiar: multiple actors, constrained systems, compliance requirements, and the need to reduce friction across handoffs. My background in healthcare operations and military logistics gives me a grounded approach to service design work where failures are costly and process quality matters.",
      "I am not presenting myself as a banking insider. The value I bring is a strong service-design practice shaped by real operational complexity: mapping journeys, surfacing breakdowns, clarifying dependencies, and helping teams build more coherent systems around the people doing the work.",
    ],
    proofPoints: [
      { stat: "70%", detail: "Certification workflow efficiency gain through simplification and visibility improvements" },
      { stat: "20%", detail: "EMR process cost reduction through redesign of a complex operational system" },
      { stat: "25%", detail: "Internal tool task-completion improvement through research and workflow redesign" },
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
      "Evidence in cross-channel workflow redesign, not just interface polish",
      "Comfort working in regulated and operationally complex environments",
      "Service-design mindset grounded in dependencies, handoffs, and root causes",
      "Strong fit for work that requires structured thinking across people, process, and tools",
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
      "My strongest design work starts upstream, where unclear systems create downstream friction for both users and the business.",
    closing:
      "This page is the best representation of my fit for service-design roles that sit inside large, regulated systems and need someone who can translate complexity into clearer operating models.",
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
    headline: "Improving complex internal workflows with research, structure, and execution discipline",
    subhead:
      "I bring a workflow-first UX approach shaped by clinical operations, internal tools, and process redesign in regulated environments.",
    meta: [
      { label: "Focus", value: "Internal tools and workflow simplification" },
      { label: "Strength", value: "Discovery, facilitation, and delivery discipline" },
      { label: "Evidence", value: "25% task completion improvement, 21K+ staff impact" },
      { label: "Best fit", value: "Enterprise UX for complex internal products" },
    ],
    intro: [
      "This page is strongest when read through the lens of internal-product UX rather than consumer-finance design. My experience maps well to the core challenge: understanding user needs in complicated business environments, simplifying dense flows, and carrying design decisions through delivery with clear rationale.",
      "The differentiator in my work is not pure UI craft. It is the ability to make complicated work more usable when the system is shaped by policy, risk, handoffs, and competing stakeholder priorities.",
    ],
    proofPoints: [
      { stat: "25%", detail: "Internal tool task-completion improvement through research and workflow redesign" },
      { stat: "21K+", detail: "Clinicians and staff affected by workflow redesign work at Memorial Sloan Kettering" },
      { stat: "20%", detail: "EMR process cost reduction through redesign of a complex operational system" },
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
      "Strong overlap with discovery, research, and stakeholder alignment",
      "Comfortable with complex workflows and regulated business contexts",
      "Proven record of turning staff pain points into structured improvements",
      "Best suited for internal-facing product work where usability affects throughput and quality",
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
      "I work best on products where better UX can reduce operational friction, improve decision-making, and make complex work easier to complete accurately.",
    closing:
      "For teams hiring into workflow-heavy enterprise UX, this page shows the parts of my background that are most relevant: research, structure, and measurable operational improvement.",
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
    headline: "Turning ambiguous operational problems into structured decisions and measurable change",
    subhead:
      "I combine service design, operational leadership, and research-informed problem solving to clarify complex systems and move teams toward better decisions.",
    meta: [
      { label: "Focus", value: "Design strategy and service design" },
      { label: "Strength", value: "Operational problem framing and measurable outcomes" },
      { label: "Evidence", value: "20% cost reduction, 70% efficiency gain, 85% speed improvement" },
      { label: "Best fit", value: "Strategy work tied to real implementation" },
    ],
    intro: [
      "This is the clearest adjacent role for presenting my background as an operator-designer rather than as a traditional product-design ladder candidate. The strongest part of that story is practical: I can structure ambiguity, surface tradeoffs, and improve systems with measurable outcomes.",
      "I am not trying to mimic a long-tenure banking or consulting profile. What I bring instead is grounded experience in operations, UX, and workflow redesign, with a track record of turning recommendations into working systems.",
    ],
    proofPoints: [
      { stat: "20%", detail: "EMR process cost reduction through operational redesign" },
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
      "Strong bridge between service design and operational execution",
      "Credible history of measurable improvement in complex environments",
      "Comfortable facilitating across stakeholders with different incentives",
      "Natural fit for root-cause diagnosis, tradeoff framing, and structured recommendations",
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
      "I am most useful when a team has a real systems problem, competing constraints, and needs someone to turn ambiguity into a grounded path forward.",
    closing:
      "For strategy-oriented roles, this page shows the throughline in my work: operational depth, clear framing, and measurable improvement rather than abstract transformation language.",
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
