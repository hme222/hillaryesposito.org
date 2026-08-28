import React, { KeyboardEvent, useRef, useState } from "react";

const TOKENS = [
  { name: "Healthy green", hex: "#3A6B2E", use: "Action and healthy state", avoid: "Long text or decoration" },
  { name: "Due amber", hex: "#C68A2E", use: "Needs attention soon", avoid: "Generic emphasis" },
  { name: "Overdue rose", hex: "#BC5A78", use: "Overdue, never shaming", avoid: "Destructive errors" },
  { name: "Calm cream", hex: "#F5F0EA", use: "Primary product surface", avoid: "Low-contrast text" },
];

const TABS = [
  { id: "reminder", label: "Today" },
  { id: "confidence", label: "Plant ID" },
  { id: "safety", label: "Pet safety" },
] as const;

type CopyState = { hex: string; ok: boolean } | null;

/**
 * @status: stable
 * @purpose: Interactive design-system demo (color-token swatches, tabbed reminder/plant-ID/pet-safety mini-widgets) for Grove, used on the Grove case study page. Grove-specific and not a generalized system-lab component others should extend.
 */
export default function GroveSystemLab() {
  const [copied, setCopied] = useState<CopyState>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("reminder");
  const [plant, setPlant] = useState("fiddle");
  const [reminderDone, setReminderDone] = useState(false);
  const [safetyChecked, setSafetyChecked] = useState(false);
  const [idSourcesOpen, setIdSourcesOpen] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const copy = async (hex: string) => {
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(hex);
        ok = true;
      }
    } catch {
      ok = false;
    }
    // Only report success when the write actually succeeded; otherwise the value
    // stays visible so it can be selected and copied by hand.
    setCopied({ hex, ok });
    window.setTimeout(
      () => setCopied((value) => (value && value.hex === hex ? null : value)),
      1800,
    );
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home" ? 0 :
      event.key === "End" ? TABS.length - 1 :
      (index + (event.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  const swatchStatus = (hex: string) => {
    if (!copied || copied.hex !== hex) return hex;
    return copied.ok ? "Copied ✓" : "Select to copy";
  };

  return (
    <div className="rp-lab">
      <section className="rp-lab__tokens" aria-labelledby="grove-color-title">
        <div className="rp-lab__intro">
          <p className="rp-kicker">Color · meaning before decoration</p>
          <h3 id="grove-color-title">A palette with jobs.</h3>
          <p>Green acts. Amber waits nearby. Rose flags overdue care without turning a plant into a disappointed parent.</p>
        </div>
        <div className="rp-swatches">
          {TOKENS.map((token) => (
            <button
              type="button"
              className={`rp-swatch${copied && copied.hex === token.hex && copied.ok ? " is-copied" : ""}`}
              key={token.hex}
              onClick={() => copy(token.hex)}
              aria-label={`${token.name} ${token.hex}. ${token.use}. Click to copy.`}
            >
              <span className="rp-swatch__chip" style={{ background: token.hex }} />
              <span className="rp-swatch__meta">
                <span className="rp-swatch__name">{token.name}</span>
                <span className="rp-swatch__hex">{swatchStatus(token.hex)}</span>
                <span className="rp-swatch__use"><b>Use:</b> {token.use}</span>
                <span className="rp-swatch__avoid"><b>Avoid:</b> {token.avoid}</span>
              </span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {copied ? (copied.ok ? `${copied.hex} copied to clipboard` : `Clipboard unavailable — select ${copied.hex} to copy it`) : ""}
        </p>
        <div className="rp-neutral" aria-label="Grove neutral color ramp from ink to paper">
          {["#20241C", "#45503F", "#66705F", "#C2CBB8", "#DEE4D6", "#F5F0EA"].map((color, index) => (
            <span key={color} style={{ background: color }} title={color}>
              <span>{index === 0 ? "ink" : index === 5 ? "paper" : index + 1}</span>
            </span>
          ))}
        </div>
        <p className="rp-tokenRecipe">ink/900 → paper/50 · the quiet range everything else sits inside</p>
      </section>

      <section className="rp-lab__live" aria-labelledby="grove-live-title">
        <div className="rp-lab__intro">
          <p className="rp-kicker">Live components · try them</p>
          <h3 id="grove-live-title">The system has to survive a tap.</h3>
          <p>Three small trust tests: one calm task, one honest guess, and one warning with a way to check it.</p>
        </div>
        <p className="rp-specimenTruth">Interactive reconstruction · built from the research and decision log, not a shipped-product claim.</p>
        <div className="rp-demo">
          <div className="rp-demo__tabs" role="tablist" aria-label="Grove component specimens">
            {TABS.map((item, index) => (
              <button
                key={item.id}
                ref={(node) => { tabRefs.current[index] = node; }}
                type="button"
                role="tab"
                id={`grove-tab-${item.id}`}
                aria-selected={tab === item.id}
                aria-controls={`grove-panel-${item.id}`}
                tabIndex={tab === item.id ? 0 : -1}
                onClick={() => setTab(item.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* All panels stay mounted (hidden when inactive) so every tab's
              aria-controls resolves to a real element. */}
          <div
            className="rp-demo__panel"
            role="tabpanel"
            id="grove-panel-reminder"
            aria-labelledby="grove-tab-reminder"
            hidden={tab !== "reminder"}
            tabIndex={0}
          >
            <div className={`rp-demoCard${reminderDone ? " is-done" : ""}`}>
              <span className="rp-demoCard__eyebrow">Grove · today</span>
              <label className="rp-demoSelect">
                <span>Plant and room</span>
                <select value={plant} onChange={(event) => {
                  setPlant(event.target.value);
                  setReminderDone(false);
                }}>
                  <option value="fiddle">Living room · Fiddle Leaf</option>
                  <option value="pothos">Kitchen · Pothos</option>
                  <option value="peace">Bedroom · Peace Lily</option>
                </select>
              </label>
              <h4>{reminderDone ? "Done. That was enough." : "One thing today."}</h4>
              <p>{reminderDone
                ? "Your care log is updated. No streak. No confetti. Your plant is still fine."
                : plant === "pothos"
                  ? "Your Pothos is due for a quick soil check."
                  : plant === "peace"
                    ? "Your Peace Lily could use a little water."
                    : "Your Fiddle Leaf could use a little water."}</p>
              <button type="button" onClick={() => setReminderDone((value) => !value)}>
                {reminderDone ? "Undo care" : "Log care"}
              </button>
            </div>
          </div>

          <div
            className="rp-demo__panel"
            role="tabpanel"
            id="grove-panel-confidence"
            aria-labelledby="grove-tab-confidence"
            hidden={tab !== "confidence"}
            tabIndex={0}
          >
            <div className="rp-demoCard">
              <span className="rp-demoCard__eyebrow">Plant ID · a guess, not a verdict</span>
              <h4>Most likely: Golden pothos</h4>
              <div className="rp-confidence">
                <span style={{ "--confidence": ".78" } as React.CSSProperties}>78% · Golden pothos</span>
                <span style={{ "--confidence": ".16" } as React.CSSProperties}>16% · Heartleaf philodendron</span>
                <span style={{ "--confidence": ".06" } as React.CSSProperties}>6% · Satin pothos</span>
              </div>
              <button
                type="button"
                aria-expanded={idSourcesOpen}
                aria-controls="grove-id-sources"
                onClick={() => setIdSourcesOpen((value) => !value)}
              >
                {idSourcesOpen ? "Hide sources" : "Check sources"}
              </button>
              <div id="grove-id-sources" className="rp-demoSources" hidden={!idSourcesOpen}>
                <p>
                  Reconstructed from Grove's research and decision log, not a live model. In the
                  prototype this confidence pattern comes from a plant-ID model; the specimen shows
                  the <b>trust behavior</b> — a ranked guess with a way to verify, never a silent
                  verdict.
                </p>
              </div>
            </div>
          </div>

          <div
            className="rp-demo__panel"
            role="tabpanel"
            id="grove-panel-safety"
            aria-labelledby="grove-tab-safety"
            hidden={tab !== "safety"}
            tabIndex={0}
          >
            <div className={`rp-demoCard rp-demoCard--safety${safetyChecked ? " is-checked" : ""}`}>
              <span className="rp-demoCard__eyebrow">Pet safety · verify before advice</span>
              <h4>{safetyChecked ? "Source checked." : "Toxic to cats and dogs"}</h4>
              <p>{safetyChecked ? "ASPCA lists pothos as toxic. If ingestion is possible, call your veterinarian." : "Grove flags the risk now and links the source. You still make the call."}</p>
              <button type="button" onClick={() => setSafetyChecked((value) => !value)}>
                {safetyChecked ? "Back to warning" : "Check the source"}
              </button>
            </div>
          </div>

          <p className="rp-tokenRecipe">surface/paper · type/label · state/{tab} · radius/field-card</p>
        </div>
      </section>
    </div>
  );
}
