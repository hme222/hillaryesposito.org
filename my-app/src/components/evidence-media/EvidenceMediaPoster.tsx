import { type ReactNode } from "react";
import "../../styles/evidence-media.css";

type EvidenceProject = "grove" | "msk" | "mobbin";

export type EvidenceMediaPosterProps = {
  project: EvidenceProject;
  className?: string;
  /**
   * Texture A is an optional material test for Grove only. The paper color
   * remains the fallback, and the texture never carries evidence.
   */
  groveMaterial?: "flat" | "texture-a";
};

type PosterFrameProps = {
  project: EvidenceProject;
  children: ReactNode;
  liveCopy: ReactNode;
  className?: string;
};

const GROVE_SCREENS = [
  { src: "/assets/grove/grove-live-collection.jpg", label: "Collection" },
  { src: "/assets/grove/grove-live-add.jpg", label: "Add a plant" },
  { src: "/assets/grove/grove-live-care.jpg", label: "Daily care" },
  { src: "/assets/grove/grove-live-journal.jpg", label: "Care journal" },
  { src: "/assets/grove/grove-live-personality.jpg", label: "Plant personality" },
  { src: "/assets/grove/grove-live-greenhouse.jpg", label: "Greenhouse" },
] as const;

const MSK_BEFORE = [
  "Open the dashboard queue",
  "Find the document",
  "Print the digital record",
  "Route paper to imaging",
  "Wait for it to be scanned",
  "Return later to confirm filing",
] as const;

const MSK_AFTER = [
  "Open the dashboard queue",
  "Select the document",
  "Choose File to chart",
  "File inside the online chart",
  "Return with status updated",
] as const;

const MOBBIN_APPS = [
  {
    name: "Kikoff",
    src: "/assets/mobbin/kikoff.jpg",
  },
  {
    name: "Polymarket",
    src: "/assets/mobbin/polymarket.jpg",
  },
  {
    name: "Discover",
    src: "/assets/mobbin/discover.jpg",
  },
] as const;

function PosterFrame({
  project,
  children,
  liveCopy,
  className = "",
}: PosterFrameProps) {
  return (
    <figure className={`evidence-poster-shell ${className}`.trim()}>
      <div className={`evidence-poster evidence-poster--${project}`} aria-hidden="true">
        {children}
      </div>
      <figcaption className="evidence-poster__description">{liveCopy}</figcaption>
    </figure>
  );
}

function GrovePoster({ material = "flat" }: { material?: "flat" | "texture-a" }) {
  const textureClass = material === "texture-a" ? " evidence-poster--texture-a" : "";

  return (
    <PosterFrame
      project="grove"
      className={`evidence-poster-shell--grove${textureClass}`}
      liveCopy={
        <>
          <p className="evidence-poster__live-note">Functional prototype · Phase 2 of 3</p>
          <p>
            The first AI-built prototype made plant care feel busy, not calm. A survey of 34 plant
            owners narrowed 11 ideas to three. Hillary rejected guilt-based reminders and chose one
            calm morning summary. The finished redesign is not shown.
          </p>
          <p className="evidence-poster__live-note">
            Poster assembled from a real Grove prototype screen and survey findings.
          </p>
          <a href="#grove-override">Read the Grove decision log</a>
        </>
      }
    >
      <span
        className="evidence-poster__material"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/generated/grove-riso-texture-a-1280.jpg)`,
        }}
      />
      <header className="evidence-poster__folio">
        <p>GROVE · AI JUDGMENT</p>
        <p>FUNCTIONAL PROTOTYPE · PHASE 2 OF 3</p>
      </header>

      <p className="evidence-poster__problem">
        The first prototype made plant care feel busy, not calm.
      </p>

      <div className="evidence-poster__grove-stages">
        <section className="evidence-stage evidence-stage--source">
          <h3>
            <span className="evidence-poster__landscape-only">AI-BUILT PROTOTYPE · REAL SCREENS</span>
            <span className="evidence-poster__portrait-only">AI-BUILT PROTOTYPE · REAL SCREEN</span>
          </h3>
          <div className="evidence-poster__contact-sheet" aria-label="Six real Grove prototype screens">
            {GROVE_SCREENS.map((screen) => (
              <figure key={screen.src}>
                <img src={screen.src} alt="" loading="lazy" decoding="async" />
                <figcaption aria-hidden="true">{screen.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="evidence-stage evidence-stage--research">
          <h3>
            <span>34 → 3</span>
            34 owners narrowed 11 ideas to 3.
          </h3>
          <p className="evidence-stage__source">SURVEY · N=34 · 22 MAY–8 JULY 2026</p>
        </section>

        <section className="evidence-stage evidence-stage--decision">
          <dl className="evidence-poster__override">
            <div>
              <dt>AI default</dt>
              <dd className="evidence-poster__landscape-only">Guilt and urgency</dd>
              <dd className="evidence-poster__portrait-only">AI default: guilt and urgency.</dd>
            </div>
            <div>
              <dt>Human override</dt>
              <dd className="evidence-poster__landscape-only">One calm morning summary</dd>
              <dd className="evidence-poster__portrait-only">
                Human override: one calm morning summary.
              </dd>
            </div>
          </dl>
          <p className="evidence-stage__source">REMINDER DIRECTION · NOT A FINISHED SCREEN</p>
        </section>
      </div>

      <footer className="evidence-poster__provenance">
        <span className="evidence-poster__landscape-only">
          Composite using real Grove prototype screens and survey findings. No finished redesign screen
          is shown.
        </span>
        <span className="evidence-poster__portrait-only">
          Real Grove prototype screen and survey findings. No finished redesign screen is shown.
        </span>
      </footer>
    </PosterFrame>
  );
}

function WorkflowSteps({
  label,
  steps,
  after = false,
}: {
  label: string;
  steps: readonly string[];
  after?: boolean;
}) {
  return (
    <section className={`evidence-workflow-steps${after ? " evidence-workflow-steps--after" : ""}`}>
      <h3>{label}</h3>
      <ol>
        {steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}

function MSKPoster() {
  return (
    <PosterFrame
      project="msk"
      liveCopy={
        <>
          <p className="evidence-poster__live-note">
            This workflow is recreated. It contains no patient data.
          </p>
          <p>
            Staff had to print a digital record, route the paper to imaging, wait, and return later to
            confirm filing. Hillary redesigned the workflow so one dashboard action connected the queue
            to the online chart. This changed four systems to two.
          </p>
          <p>The redesigned workflows touched 21,000+ clinicians and staff.</p>
          <p>
            Hillary led this workflow redesign within a larger organization-wide initiative.
          </p>
          <a href="#msk-workflow">Read the MSK workflow case study</a>
        </>
      }
    >
      <header className="evidence-poster__folio">
        <p>MEMORIAL SLOAN KETTERING · CLINICAL SYSTEMS</p>
        <p>RECREATED WORKFLOW · NO PATIENT DATA</p>
      </header>

      <div className="evidence-poster__msk-layout">
        <section className="evidence-poster__statement">
          <p className="evidence-poster__problem">The digital workflow had become a paper ritual.</p>
          <h2>Four systems became two.</h2>
          <p className="evidence-poster__mechanism">
            One dashboard action connected the queue to the online chart.
          </p>
          <p className="evidence-poster__scale evidence-poster__landscape-only">
            Workflows touching 21,000+ clinicians and staff
          </p>
        </section>

        <section className="evidence-poster__workflow" aria-label="Recreated current-state and future-state workflow">
          <div className="evidence-poster__workflow-map" aria-hidden="true">
            <div>
              <span>BEFORE · DASHBOARD → PAPER → IMAGING → ONLINE CHART</span>
              <i>→</i>
              <span>AFTER · DASHBOARD → ONLINE CHART</span>
            </div>
            <p>
              <b>FILE TO CHART</b>
              <span>Connect the queue directly to the online chart.</span>
            </p>
          </div>
          <div className="evidence-poster__workflow-rows">
            <WorkflowSteps label="BEFORE · SIX STEPS" steps={MSK_BEFORE} />
            <WorkflowSteps label="AFTER · FIVE STEPS" steps={MSK_AFTER} after />
          </div>
          <p className="evidence-poster__scale evidence-poster__portrait-only">
            Workflows touching 21,000+ clinicians and staff
          </p>
        </section>
      </div>

      <footer className="evidence-poster__provenance evidence-poster__provenance--split">
        <span>RECREATED WORKFLOW · NO PATIENT DATA</span>
        <span>Hillary led this workflow redesign within a larger organization-wide initiative.</span>
      </footer>
    </PosterFrame>
  );
}

function MobbinPoster() {
  return (
    <PosterFrame
      project="mobbin"
      liveCopy={
        <>
          <p className="evidence-poster__live-note">
            The source products are Kikoff, Polymarket, and Discover. Hillary documented the flows; she
            did not design those products or Mobbin.
          </p>
          <p>
            A screenshot is not a flow. Over four months, Hillary captured, sequenced, annotated, and
            labeled more than 200 screens from three live finance apps for Mobbin Finance+. She turned
            them into references that could make sense without their author.
          </p>
          <a href="#mobbin-work">Read the Mobbin documentation case study</a>
        </>
      }
    >
      <header className="evidence-poster__folio">
        <p>MOBBIN · UX FLOW DOCUMENTATION</p>
        <p>3 apps · 200+ screens each · 4 months</p>
      </header>

      <div className="evidence-poster__mobbin-layout">
        <section className="evidence-poster__statement">
          <p className="evidence-poster__problem">A screenshot is not a flow.</p>
          <p className="evidence-poster__value">A useful reference has to survive without its author.</p>
          <h2 className="evidence-poster__landscape-only">Capture → Map → Name → Verify</h2>
          <p className="evidence-poster__scale">3 live finance apps · 200+ screens each · 4 months</p>
          <p className="evidence-poster__contribution evidence-poster__landscape-only">
            Hillary’s contribution: flow documentation and pattern curation.
          </p>
        </section>

        <section className="evidence-poster__capture-desk" aria-label="Three attributed source-product captures">
          <div className="evidence-poster__captures">
            {MOBBIN_APPS.map((app) => (
              <figure key={app.name}>
                <figcaption>SOURCE PRODUCT · {app.name.toUpperCase()}</figcaption>
                <img src={app.src} alt="" loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
          <ol className="evidence-poster__method">
            {["Capture", "Map", "Name", "Verify"].map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
          <p className="evidence-poster__contribution evidence-poster__portrait-only">
            Hillary’s contribution: flow documentation and pattern curation.
          </p>
        </section>
      </div>

      <footer className="evidence-poster__provenance">
        <span className="evidence-poster__landscape-only">
          Source products by Kikoff, Polymarket, and Discover. Hillary documented the flows; she did not
          design the apps or Mobbin.
        </span>
        <span className="evidence-poster__portrait-only">
          Hillary documented these source-app flows. She did not design the apps or Mobbin.
        </span>
      </footer>
    </PosterFrame>
  );
}

export function EvidenceMediaPoster({
  project,
  className = "",
  groveMaterial = "flat",
}: EvidenceMediaPosterProps) {
  return (
    <div className={`evidence-media ${className}`.trim()}>
      {project === "grove" && <GrovePoster material={groveMaterial} />}
      {project === "msk" && <MSKPoster />}
      {project === "mobbin" && <MobbinPoster />}
    </div>
  );
}

export { GrovePoster, MSKPoster, MobbinPoster };
