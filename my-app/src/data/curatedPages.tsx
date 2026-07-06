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
  eyebrow: string;
  headline: string;
  subhead: string;
  meta: Array<{ label: string; value: string }>;
  intro: string[];
  proofPoints: Array<{ stat: string; detail: string }>;
  caseStudyOrder: Array<{ title: string; reason: string }>;
  whyFit: string[];
  relevantExperience: string[];
  keywords: string[];
  hiringManagerNote: string;
  outreachLine: string;
  cautions: string[];
  recommendation: string;
  supportLinks: CuratedLink[];
  relatedLinks: CuratedLink[];
};

export const curatedPages: Record<string, CuratedPage> = {
  "omada-staff-product-designer-healthcare-ai": {
    slug: "omada-staff-product-designer-healthcare-ai",
    company: "Omada Health",
    role: "Staff Product Designer",
    eyebrow: "Tailored Portfolio Page · Portfolio page priority",
    headline: "Designing AI-enabled healthcare experiences grounded in real operational complexity",
    subhead:
      "Hillary Esposito is a UX and product designer with an MHA and deep healthcare operations experience, focused on making complex clinical and operational workflows clearer, more trustworthy, and easier to act on.",
    meta: [
      { label: "Target role", value: "Staff Product Designer" },
      { label: "Primary angle", value: "Healthcare workflows + service design + AI judgment" },
      { label: "Priority", value: "Apply now" },
      { label: "Best proof", value: "21K+ clinicians, 20% EMR cost reduction, 70% efficiency gain" },
    ],
    intro: [
      "This role sits at the intersection of healthcare complexity, service design, and AI-supported decision-making, which is where Hillary's background is strongest. Her experience spans clinical operations, UX research, internal tools, and process redesign, with a track record of improving how high-stakes work actually gets done for the people inside the system.",
      "She brings domain fluency that is hard to fake: hospital operations, workflow redesign, bilingual communication, and measurable improvement in environments where trust and speed both matter. The value here is not generic product-design polish. It is the ability to shape tools and journeys that make sense in real care settings.",
    ],
    proofPoints: [
      { stat: "21K+", detail: "Clinicians and administrative staff affected by workflow redesign work at MSK" },
      { stat: "20%", detail: "EMR process cost reduction through redesign of a complex operational system" },
      { stat: "70%", detail: "Certification workflow efficiency gain through simplification and visibility improvements" },
      { stat: "25%", detail: "Internal tool task-completion improvement through UX research, usability testing, and task analysis" },
    ],
    caseStudyOrder: [
      {
        title: "MSK internal tools and workflow redesign",
        reason: "Start with direct healthcare credibility, operational reality, and workflow impact at scale.",
      },
      {
        title: "Certification and onboarding workflow redesign",
        reason: "Reinforces service design, friction removal, and process clarity across cross-functional teams.",
      },
      {
        title: "AI-supported product judgment",
        reason: "Use Grove to show where AI helps exploration and where human oversight still needs to lead.",
      },
      {
        title: "Military medical logistics transformation",
        reason: "End with high-stakes systems thinking and execution under pressure.",
      },
    ],
    whyFit: [
      "Deep familiarity with high-stakes workflows where trust and clarity matter",
      "Strong service-design and systems-thinking foundation, not just UI execution",
      "Proven ability to translate messy operational reality into cleaner processes and better tools",
      "Credible bridge between research, workflow redesign, and AI-assisted product thinking",
    ],
    relevantExperience: [
      "Hillary's background combines UX research, workflow analysis, clinical operations, and process improvement. At Memorial Sloan Kettering, she worked inside healthcare operations before moving into UX and internal tools work, which gives her unusually strong context for designing systems that need to work for real staff under pressure.",
      "As an Army medical logistics officer, she also led process and tracking improvements where broken workflows had immediate consequences. That shows up in how she approaches reliability, handoffs, and decision support inside complex systems.",
    ],
    keywords: [
      "healthcare",
      "care experience",
      "service design",
      "AI",
      "workflow",
      "research",
      "trust",
      "clinical",
      "operations",
      "inclusive design",
    ],
    hiringManagerNote:
      "I am strongest in environments where product decisions affect operational reality, not just screen-level aesthetics.",
    outreachLine:
      "I put together a role-specific portfolio page that focuses on healthcare workflows, service design, and AI-enabled product judgment here: [portfolio URL].",
    cautions: [
      "Do not imply direct ownership of shipped clinical AI products unless the evidence is explicit.",
      "Keep the AI framing grounded in judgment, prototyping, and workflow implications rather than ML depth.",
      "Avoid making the page feel like an operations resume with a design layer on top. Design decisions still need to stay visible.",
    ],
    recommendation:
      "Use first. This is the clearest healthcare-first page and the strongest match between Hillary's background and the problem space.",
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
        description: "AI-supported product judgment, rapid prototyping, and end-to-end product design.",
        icon: <SproutIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "JPM Service Design VP",
        path: "/curated/jpm-service-design-vp-systems",
        description: "Strongest adjacent regulated-systems narrative.",
        icon: <HandIcon />,
      },
      {
        label: "JPM Design Strategy VP",
        path: "/curated/jpm-design-strategy-vp-service-ops",
        description: "Operator-to-strategy bridge for ambiguity-heavy enterprise work.",
        icon: <TerminalIcon />,
      },
    ],
  },
  "jpm-service-design-vp-systems": {
    slug: "jpm-service-design-vp-systems",
    company: "JPMorgan Chase",
    role: "Service Design Vice President",
    eyebrow: "Tailored Portfolio Page · Strong adjacent fit",
    headline: "Service design for high-stakes systems, shaped by operational reality",
    subhead:
      "Hillary Esposito designs end-to-end workflows for regulated, high-consequence environments, combining service design, research, and process improvement to make complex systems easier to trust and use.",
    meta: [
      { label: "Target role", value: "Service Design Vice President" },
      { label: "Primary angle", value: "Service blueprinting + systems thinking + trust design" },
      { label: "Priority", value: "Warm intro first" },
      { label: "Best proof", value: "70% workflow gain, 20% cost reduction, 85% resupply speed improvement" },
    ],
    intro: [
      "This role is a strong adjacent fit because it centers on the kind of work Hillary already does well: mapping messy service journeys, identifying friction across channels and handoffs, and creating clearer systems for people operating under pressure. The industry is different, but the design challenge is familiar: complex systems, multiple stakeholders, compliance constraints, and the need to turn ambiguity into repeatable service patterns.",
      "Her value here is systems thinking backed by lived experience. She has worked inside healthcare operations and military logistics, where service failures are not abstract. That makes her credible for service blueprinting, journey mapping, and designing for trust in agentic or automation-supported environments.",
    ],
    proofPoints: [
      { stat: "70%", detail: "Certification workflow efficiency gain through simplification and visibility improvements" },
      { stat: "20%", detail: "EMR process cost reduction through redesign of a complex operational system" },
      { stat: "25%", detail: "Internal tool task-completion improvement through research and workflow redesign" },
      { stat: "85%", detail: "Medical resupply speed improvement across seven aid stations using better tracking and process structure" },
    ],
    caseStudyOrder: [
      {
        title: "Certification workflow redesign",
        reason: "Best entry point for service blueprinting, handoffs, and operational friction removal.",
      },
      {
        title: "MSK internal tools and EMR redesign",
        reason: "Adds regulated-system complexity and evidence of cross-functional coordination.",
      },
      {
        title: "Medical logistics transformation",
        reason: "Shows scalability, orchestration, and trust under pressure.",
      },
    ],
    whyFit: [
      "Strong evidence in cross-channel workflow redesign, not just screens",
      "Comfort working inside regulated and operationally complex environments",
      "Practical service-design mindset grounded in handoffs, dependencies, and root causes",
      "Credible angle on trust and controlled autonomy in agentic systems",
    ],
    relevantExperience: [
      "Hillary has spent her career improving systems that depend on coordination across people, tools, and process constraints. Her healthcare and logistics work gives her unusual depth in diagnosing operational failure points, aligning stakeholders, and redesigning journeys so the service works more reliably from end to end.",
    ],
    keywords: [
      "service blueprinting",
      "journey mapping",
      "systems thinking",
      "agentic",
      "trust",
      "cross-functional",
      "customer experience",
      "process",
      "stakeholders",
      "accessibility",
    ],
    hiringManagerNote:
      "My strongest design work starts upstream, where unclear systems create downstream friction for both users and the business.",
    outreachLine:
      "I drafted a tailored portfolio page focused on service blueprinting, systems thinking, and workflow redesign for the Service Design VP role here: [portfolio URL].",
    cautions: [
      "Do not overstate finance-domain knowledge.",
      "Acknowledge that the title is senior in banking but frame fit around the work, not the label.",
      "Keep agentic-language claims limited to design-for-trust and workflow implications unless direct shipping evidence exists.",
    ],
    recommendation:
      "Strong consider. This is the best JPM page to build if Hillary wants a serious adjacent regulated-systems option.",
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
        description: "Customer-journey and trust diagnostics through iterative research and testing.",
        icon: <MagnifierIcon />,
      },
    ],
    relatedLinks: [
      {
        label: "Omada Staff Product Designer",
        path: "/curated/omada-staff-product-designer-healthcare-ai",
        description: "Healthcare-first page and strongest direct match.",
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
    eyebrow: "Tailored Portfolio Page · Workflow-heavy enterprise UX",
    headline: "Designing complex internal workflows with research, structure, and execution discipline",
    subhead:
      "Hillary Esposito brings a workflow-first UX approach shaped by clinical operations, internal tools, and process redesign in regulated environments.",
    meta: [
      { label: "Target role", value: "UX Design Lead, Vice President" },
      { label: "Primary angle", value: "Internal tools + discovery + delivery discipline" },
      { label: "Priority", value: "Save and refine" },
      { label: "Best proof", value: "25% task completion improvement, 21K+ staff impact" },
    ],
    intro: [
      "This role is strongest if positioned around complex internal workflows rather than consumer-finance polish. Hillary's experience maps well to the core problem: understanding user needs in complicated business environments, facilitating early discovery, simplifying dense flows, and carrying design decisions through delivery with clear rationale.",
      "The differentiator here is not just that she can design screens. It is that she understands how hard it is to make complicated work usable when the system is constrained by risk, policy, handoffs, and competing stakeholder priorities.",
    ],
    proofPoints: [
      { stat: "25%", detail: "Internal tool task-completion improvement through research and workflow redesign" },
      { stat: "21K+", detail: "Clinicians and staff affected by workflow redesign work at MSK" },
      { stat: "20%", detail: "EMR process cost reduction through redesign of a complex operational system" },
      { stat: "70%", detail: "Certification workflow efficiency gain supported by onboarding and process improvements" },
    ],
    caseStudyOrder: [
      { title: "Internal tools UX research and redesign", reason: "Best match for discovery, facilitation, and workflow simplification." },
      { title: "Onboarding redesign", reason: "Reinforces information hierarchy, comprehension, and adoption." },
      { title: "Certification and EMR redesign", reason: "Shows delivery in constrained operational environments." },
    ],
    whyFit: [
      "Strong overlap with discovery, research, and stakeholder alignment",
      "Comfortable with complex workflows and regulated business contexts",
      "Proven record of turning staff pain points into structured improvements",
      "Credible fit for internal-facing product work where usability directly affects throughput and quality",
    ],
    relevantExperience: [
      "At Memorial Sloan Kettering, Hillary supported internal tools and workflow improvements by combining research, task analysis, and process redesign. Her prior operations background means she reads workflow complexity as a design problem, not just a business constraint.",
    ],
    keywords: [
      "UX research",
      "discovery",
      "complex workflows",
      "design systems",
      "stakeholder alignment",
      "delivery",
      "information hierarchy",
      "iterative prototyping",
      "accessibility",
    ],
    hiringManagerNote:
      "I work best on products where better UX can reduce operational friction, improve decision-making, and make complex work easier to complete accurately.",
    outreachLine:
      "I created a targeted portfolio draft for the UX Design Lead role that focuses on internal tools, workflow simplification, and research-led redesign here: [portfolio URL].",
    cautions: [
      "This page should not over-index on visual polish if the evidence is workflow-heavy.",
      "Do not claim formal people-management depth unless mentoring and cross-functional leadership are framed carefully.",
      "Keep the lead story centered on discovery, facilitation, and delivery quality.",
    ],
    recommendation:
      "Consider. Good adjacent fit if Hillary wants workflow-heavy enterprise UX, but weaker domain resonance than Omada.",
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
    eyebrow: "Tailored Portfolio Page · Operator-to-strategy bridge",
    headline: "Turning ambiguous operational problems into structured decisions and measurable change",
    subhead:
      "Hillary Esposito combines service design, operational leadership, and research-informed problem solving to clarify complex systems and move teams toward better decisions.",
    meta: [
      { label: "Target role", value: "Design Strategy, Vice President" },
      { label: "Primary angle", value: "Service design + facilitation + measurable operational outcomes" },
      { label: "Priority", value: "Save and refine" },
      { label: "Best proof", value: "20% cost reduction, 70% efficiency gain, 85% speed improvement" },
    ],
    intro: [
      "This is the clearest JPM role for framing Hillary as an operator-designer rather than a traditional product-design ladder candidate. The role asks for journey mapping, service design tools, facilitation, risk-aware thinking, and turning evidence into decision-ready recommendations. That aligns closely with how she has worked across healthcare operations, internal process redesign, and logistics.",
      "The page should position her as someone who can structure ambiguity, surface tradeoffs, and improve systems with measurable outcomes. That is more convincing here than trying to mimic a conventional strategy-consulting or long-tenure banking profile.",
    ],
    proofPoints: [
      { stat: "20%", detail: "EMR process cost reduction through operational redesign" },
      { stat: "70%", detail: "Certification workflow efficiency gain through simplification and visibility" },
      { stat: "85%", detail: "Medical resupply speed improvement using better tracking and system structure" },
      { stat: "21K+", detail: "Clinical and administrative staff reached by internal workflow improvement work" },
    ],
    caseStudyOrder: [
      { title: "EMR and certification workflow redesign", reason: "Best evidence for structured problem solving, tradeoffs, and measurable outcomes." },
      { title: "Medical logistics systems improvement", reason: "Strong support for ambiguity management and execution discipline." },
      { title: "Internal tools research and redesign", reason: "Adds user-centered discovery and cross-functional problem framing." },
    ],
    whyFit: [
      "Strong bridge between service design and operational execution",
      "Credible history of measurable improvement in complex environments",
      "Comfortable facilitating across stakeholders with different incentives",
      "Naturally aligned to root-cause diagnosis, tradeoff framing, and structured recommendations",
    ],
    relevantExperience: [
      "Hillary's background is unusually useful for design strategy work because it is grounded in both analysis and implementation. She has worked inside clinical operations, supported UX and internal-tool redesign, and led logistics improvements where recommendations had to become working systems, not just slide narratives.",
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
    outreachLine:
      "I put together a tailored page for the Design Strategy VP role focused on service design, measurable process improvement, and regulated-environment problem solving here: [portfolio URL].",
    cautions: [
      "This role prefers deep tenure; the page should not pretend Hillary is coming from a decade inside enterprise design strategy teams.",
      "Keep the case centered on evidence and execution, not abstract transformation language.",
      "Avoid consultant-speak.",
    ],
    recommendation:
      "Consider. Strong adjacent narrative if Hillary wants to sell the operator-to-design-strategy bridge.",
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
        description: "Better if the conversation leans toward blueprinting and trust design.",
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
