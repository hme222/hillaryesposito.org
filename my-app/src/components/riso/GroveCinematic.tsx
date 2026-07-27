import React from "react";

export default function GroveCinematic() {
  return (
    <section className="rp-cinema" id="grove-brief" aria-labelledby="grove-cinema-title">
      <div className="rp-cinema__sticky">
        <div className="rp-cinema__wash" aria-hidden="true" />
        <img
          className="rp-cinema__screen"
          src="/assets/grove/grove1.png"
          alt="Grove mobile welcome screen"
        />
        <div className="rp-cinema__artifact rp-cinema__artifact--reminder" aria-hidden="true">
          <span>Grove · 8:00 AM</span>
          <b>One thing today.</b>
          <p>Your Fiddle Leaf could use a little water.</p>
        </div>
        <div className="rp-cinema__artifact rp-cinema__artifact--safety" aria-hidden="true">
          <span>Pet safety</span>
          <b>Keep away from cats</b>
          <p>Source attached. The AI does not get the last word.</p>
        </div>
        <div className="rp-cinema__artifact rp-cinema__artifact--note" aria-hidden="true">
          <span>Research journal · 17/32</span>
          <b>“Peaceful, not stressful.”</b>
        </div>
        <div className="rp-cinema__bridge">
          <p className="rp-kicker">The brief, before the screens</p>
          <h2 id="grove-cinema-title">Care should fit into a life already happening.</h2>
          <p>
            One clear task. A reason you can inspect. And no tiny plant trying to guilt you from a
            lock screen.
          </p>
        </div>
      </div>
    </section>
  );
}
