import React from "react";
import { Link, useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import RisoDefs from "../../components/riso/RisoDefs";
import "../../styles/riso.css";
import "../../styles/riso-page.css";

const assetSpecs = [
  { channel: "Ecommerce hero", size: "2880 x 1400", purpose: "Launch story, product mood, primary CTA" },
  { channel: "PDP promo module", size: "1440 x 900", purpose: "Collection context inside product detail pages" },
  { channel: "Instagram story", size: "1080 x 1920", purpose: "Vertical launch asset with swipe CTA" },
  { channel: "Instagram feed", size: "1080 x 1350", purpose: "Editorial product moment and campaign recall" },
  { channel: "Email header", size: "1200 x 720", purpose: "Launch, reminder, and last-call campaign variants" },
  { channel: "Lookbook spread", size: "A4 landscape", purpose: "Seasonal narrative and wholesale/editorial handoff" },
];

const systemRules = [
  "Hero layouts use one dominant image field, one sharp typographic block, and one CTA. No competing calls to action.",
  "Typography stays architectural: condensed headline, restrained serif caption, clear product metadata.",
  "Image crops favor structure, silhouette, and fabric detail over busy lifestyle context.",
  "Each channel keeps the same campaign language but changes density for the user's attention state.",
  "Production files use channel, campaign, drop, size, and version in the file name for clean handoff.",
];

const creativeRoutes = [
  {
    name: "A. Editorial restraint",
    note: "Large negative space, product as sculpture, quiet typography.",
  },
  {
    name: "B. Digital urgency",
    note: "Harder crops, larger CTA, stronger contrast for social and email.",
  },
  {
    name: "C. After-dark utility",
    note: "Oxblood accents, dark retail mood, event and launch assets.",
  },
];

export default function FashionCampaignSystem() {
  usePageTitle("Fashion Campaign System: Sculpted Utility");
  const navigate = useNavigate();

  return (
    <main className="riso-page fashion-system-page" aria-label="Fashion campaign system artifact" lang="en">
      <RisoDefs />

      <nav className="rp-breadcrumb" aria-label="Breadcrumb">
        <Link to="/curated/fashion-graphic-designer">Role fit</Link> / <span>Sculpted Utility</span>
      </nav>

      <header className="rp-hero fashion-system-hero">
        <div className="rp-hero__content fashion-system-hero__copy">
          <div className="rp-clearing">
            <span className="rp-eyebrow">Speculative graphic design artifact · Fashion / lifestyle</span>
            <h1 className="rp-h1">Sculpted Utility</h1>
            <p className="rp-sub">
              A compact campaign system for a premium capsule launch: key visual, ecommerce modules,
              social and email crops, lookbook spread, packaging touchpoints, and production specs.
            </p>
            <div className="rp-hero__ctas fashion-system-actions">
              <a href="#campaign-assets" className="rp-cta">View assets →</a>
              <Link to="/curated/fashion-graphic-designer" className="rp-cta rp-cta--ghost">Back to role fit</Link>
            </div>
          </div>
        </div>

        <div className="rp-hero__media">
          <div className="fashion-key-visual" aria-label="Campaign key visual mockup">
            <div className="fashion-key-visual__image">
              <span className="fashion-garment fashion-garment--coat" />
              <span className="fashion-garment fashion-garment--trouser" />
            </div>
            <div className="fashion-key-visual__type">
              <span>Drop 01</span>
              <strong>Sculpted Utility</strong>
              <small>Outerwear · Tailoring · Textured layers</small>
            </div>
          </div>
        </div>
      </header>

      <nav className="rp-chapters" aria-label="Fashion campaign system chapters">
        <span aria-hidden="true">Jump to</span>
        <a href="#campaign-assets">System</a>
        <a href="#fashion-editorial">Editorial</a>
        <a href="#fashion-rules">Rules</a>
        <a href="#fashion-handoff">Handoff</a>
      </nav>

      <section className="rp-section" aria-label="Campaign strategy" style={{ paddingBottom: 0 }}>
        <div className="rp-wrap">
          <div className="fashion-system-meta rp-metagrid">
            <article>
              <span className="rp-metagrid__k">Creative brief</span>
              <strong className="rp-metagrid__v">A sharp, practical digital retail system.</strong>
            </article>
            <article>
              <span className="rp-metagrid__k">Audience</span>
              <strong className="rp-metagrid__v">Fashion-conscious shoppers moving between Instagram, email, and ecommerce.</strong>
            </article>
            <article>
              <span className="rp-metagrid__k">Goal</span>
              <strong className="rp-metagrid__v">Make the capsule feel premium, clear, and immediately shoppable.</strong>
            </article>
          </div>
        </div>
      </section>

      <section id="campaign-assets" className="rp-section fashion-system-section">
        <div className="rp-wrap">
        <div className="fashion-system-section__header">
          <p className="rp-kicker">Campaign system</p>
          <h2 className="rp-title">One visual language, multiple channels</h2>
          <p className="rp-lede">
            The system keeps the same mood and hierarchy, then adapts density for each surface:
            brand story on the homepage, product clarity on ecommerce, immediacy on social, and
            editorial pacing in the lookbook.
          </p>
        </div>

        <div className="fashion-direction-board" aria-label="Art direction board">
          <div className="fashion-direction-board__statement">
            <span>Art direction</span>
            <strong>Structured silhouettes, warm minimalism, and precise retail hierarchy.</strong>
          </div>
          <div className="fashion-direction-board__tiles" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="fashion-route-grid" aria-label="Creative direction exploration">
          {creativeRoutes.map((route) => (
            <article key={route.name} className="fashion-route-card">
              <div className="fashion-route-card__visual" />
              <h3>{route.name}</h3>
              <p>{route.note}</p>
            </article>
          ))}
        </div>

        <div className="fashion-channel-grid">
          <article className="fashion-channel fashion-channel--hero">
            <p className="fashion-channel__label">Ecommerce hero</p>
            <h3>Drop 01</h3>
            <span>Sculpted Utility</span>
            <span className="fashion-channel__mock-cta">Shop the capsule</span>
          </article>

          <article className="fashion-channel fashion-channel--pdp">
            <div className="fashion-pdp-card">
              <div className="fashion-pdp-card__image" />
              <div>
                <p>Textured wool wrap coat</p>
                <strong>$248</strong>
                <span>Part of Drop 01 · Sculpted Utility</span>
              </div>
            </div>
            <div className="fashion-pdp-module">
              <p>Style note</p>
              <span>Layered with fluid trousering and a tonal knit for a structured winter silhouette.</span>
            </div>
          </article>

          <article className="fashion-channel fashion-channel--story">
            <p>01 / 04</p>
            <h3>New forms in winter utility</h3>
            <span>Swipe to shop</span>
          </article>

          <article className="fashion-channel fashion-channel--email">
            <p className="fashion-channel__label">Email launch</p>
            <h3>Sculpted Utility has arrived</h3>
            <div className="fashion-email-products" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="fashion-channel__mock-cta">Explore the drop</span>
          </article>
        </div>
        </div>
      </section>

      <section id="fashion-editorial" className="rp-section rp-section--alt fashion-system-section">
        <div className="rp-wrap">
        <div className="fashion-system-section__header">
          <p className="rp-kicker">Lookbook + print</p>
          <h2 className="rp-title">Editorial pacing for collection storytelling</h2>
        </div>

        <div className="fashion-lookbook">
          <div className="fashion-lookbook__page fashion-lookbook__page--image">
            <span className="fashion-lookbook__number">01</span>
          </div>
          <div className="fashion-lookbook__page fashion-lookbook__page--copy">
            <p>Outerwear, softened</p>
            <h3>Sharp silhouettes with room to move.</h3>
            <span>
              The print system slows the campaign down. Large image fields, narrow captions, and
              controlled negative space let the product feel more premium than promotional.
            </span>
          </div>
        </div>

        <div className="fashion-print-grid">
          <article>
            <span className="fashion-print-mark">SU</span>
            <p>Hangtag</p>
          </article>
          <article>
            <span className="fashion-print-mark">Drop 01</span>
            <p>Event invite</p>
          </article>
          <article>
            <span className="fashion-print-mark">Sculpted Utility</span>
            <p>Packaging sticker</p>
          </article>
        </div>
        </div>
      </section>

      <section id="fashion-rules" className="rp-section fashion-system-section">
        <div className="rp-wrap fashion-system-section--rules">
        <div>
          <p className="rp-kicker">Brand system rules</p>
          <h2 className="rp-title">How the system stays consistent</h2>
          <ul className="fashion-rule-list">
            {systemRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>

        <div className="fashion-type-card" role="note">
          <p>Type + color</p>
          <h3>Aa</h3>
          <div className="fashion-swatches" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <small>
            Bone, espresso, oxblood, and warm stone. Restrained enough for luxury, warm enough for digital retail.
          </small>
        </div>
        </div>
      </section>

      <section id="fashion-handoff" className="rp-section rp-section--alt fashion-system-section">
        <div className="rp-wrap">
        <div className="fashion-system-section__header">
          <p className="rp-kicker">Production handoff</p>
          <h2 className="rp-title">Asset plan for marketing, ecommerce, and production teams</h2>
          <p className="rp-lede">
            This is where my UX and production discipline helps: every asset has a channel, purpose,
            size, and naming system so collaborators can move quickly without losing quality.
          </p>
        </div>

        <div className="fashion-spec-table-wrap">
          <table className="fashion-spec-table">
            <caption>Fashion campaign asset production plan</caption>
            <thead>
              <tr>
                <th scope="col">Channel</th>
                <th scope="col">Size</th>
                <th scope="col">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {assetSpecs.map((spec) => (
                <tr key={spec.channel}>
                  <th scope="row">{spec.channel}</th>
                  <td>{spec.size}</td>
                  <td>{spec.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="fashion-file-note">
          <strong>File naming example:</strong>
          <span>MDV_SU_Drop01_EmailHeader_1200x720_v03_HE.jpg</span>
        </div>
        </div>
      </section>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <p className="rp-kicker">Why this artifact matters</p>
          <h2>It proves the gap I needed to close</h2>
          <p>
            My main portfolio proves systems thinking and UX. This artifact adds the missing graphic
            design evidence for a fashion role: visual taste, campaign hierarchy, channel adaptation,
            and production-ready thinking.
          </p>
        <button type="button" className="rp-cta" onClick={() => navigate("/?scrollTo=contact")}>
          Get in touch →
        </button>
        </div>
      </section>
    </main>
  );
}
