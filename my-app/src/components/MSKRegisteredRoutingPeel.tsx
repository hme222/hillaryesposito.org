import React from "react";
import { MSK_COPY, type MskCopy } from "../data/mskCaseStudy";

type WorkflowCopy = MskCopy["workflow"];

function RegistrationSpine() {
  return (
    <span className="fp-routingPeel__spine" aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => <i key={index} />)}
    </span>
  );
}

function Route({
  steps,
  paperSteps = [],
}: {
  steps: string[];
  paperSteps?: number[];
}) {
  return (
    <div className="fp-routingPeel__route">
      {steps.map((step, index) => (
        <div
          className="fp-routingPeel__step"
          data-lane={paperSteps.includes(index) ? "paper" : "system"}
          key={step}
        >
          <b>{String(index + 1).padStart(2, "0")}</b>
          <span>{step}</span>
          {paperSteps.includes(index) && <em>outside EMR</em>}
        </div>
      ))}
    </div>
  );
}

/**
 * @status: proposed
 * @purpose: A deterministic, decorative static preview of the MSK workflow
 * redesign. The lifted paper layer holds the exact six-step current state;
 * the registered sheet beneath holds the exact five-step in-EMR state.
 * Adjacent ordered lists remain the sole semantic text alternative.
 */
export default function MSKRegisteredRoutingPeel({
  copy = MSK_COPY.en.workflow,
}: {
  copy?: WorkflowCopy;
}) {
  return (
    <div className="fp-workflowMap fp-routingPeel" aria-hidden="true">
      <div className="fp-routingPeel__stage">
        <div className="fp-routingPeel__sheet fp-routingPeel__sheet--after">
          <RegistrationSpine />
          <header className="fp-routingPeel__heading">
            <span>{copy.mapAfter}</span>
            <strong>{copy.afterHeading}</strong>
          </header>
          <Route steps={copy.after} />
          <p className="fp-routingPeel__resolution">One queue · no paper handoff</p>
        </div>

        <div className="fp-routingPeel__sheet fp-routingPeel__sheet--before">
          <RegistrationSpine />
          <header className="fp-routingPeel__heading">
            <span>{copy.mapBefore}</span>
            <strong>{copy.beforeHeading}</strong>
          </header>
          <Route steps={copy.before} paperSteps={[2, 3, 4]} />
          <p className="fp-routingPeel__detour">{copy.mapAside}</p>
          <span className="fp-routingPeel__curl" />
        </div>

        <p className="fp-routingPeel__editMark">
          <span>Removed layer</span>
          <strong>paper routing</strong>
        </p>
      </div>
    </div>
  );
}
