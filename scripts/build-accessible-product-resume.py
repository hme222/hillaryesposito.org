#!/usr/bin/env python3
"""Build the primary one-page résumé as a semantic, tagged PDF via Chromium."""

from pathlib import Path
from shutil import copyfile
import argparse
import os
import subprocess
import tempfile


ROOT = Path(__file__).resolve().parents[1]
CHROME = Path(
    os.environ.get(
        "PORTFOLIO_CHROME_BIN",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    )
)
FILENAMES = {
    "portfolio": "Hillary_Esposito_Portfolio_Resume.pdf",
    "healthcare": "Hillary_Esposito_Healthcare_Product_Service_Designer_Resume.pdf",
}


HTML = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="UX and product design résumé for healthcare and consumer products: workflows, research, and internal tools." />
  <title>Hillary Esposito - UX and Product Designer Resume</title>
  <style>
    /* Every size is 12pt or larger and the résumé is one page (Hillary, 2026-11-10). At 12pt the full
       content runs to about 1.8 pages, so the one-page version drops the skills list, the Knowunity
       and Mobbin entries and a few secondary bullets; the full text is in git history
       (commit 07acffb and earlier). */
    @page { size: Letter; margin: 0.4in 0.5in 0.4in; }
    * { box-sizing: border-box; }
    html { color: #17251f; background: #fff; font-family: Arial, Helvetica, sans-serif; font-size: 12pt; line-height: 1.22; }
    body { margin: 0; }
    header { text-align: center; margin-bottom: 0.08in; }
    h1 { margin: 0; font-size: 28pt; line-height: 1.05; letter-spacing: 0.01em; }
    .role { margin: 0.05in 0 0.03in; color: #285943; font-size: 12pt; font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase; line-height: 1.3; }
    address { color: #40544b; font-style: normal; font-size: 12pt; line-height: 1.4; }
    a { color: #285943; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 2px; }
    main { display: block; }
    section { break-inside: auto; }
    h2 { margin: 0.085in 0 0.025in; padding-top: 0.03in; color: #285943; font-size: 14pt; line-height: 1.15; letter-spacing: 0.03em; text-transform: uppercase; border-top: 1px solid #b9c6bf; break-after: avoid; }
    h3 { margin: 0.05in 0 0; font-size: 12.5pt; line-height: 1.2; break-after: avoid; }
    p { margin: 0.02in 0; }
    .meta { color: #4a5b53; font-style: italic; font-size: 12pt; }
    ul { margin: 0.03in 0 0.05in; padding-left: 0.22in; }
    li { margin: 0.018in 0; padding-left: 0.01in; break-inside: avoid; }
    .skills p { margin: 0.03in 0; }
    .education { font-size: 12pt; }
    footer { margin-top: 0.12in; padding-top: 0.08in; border-top: 1px solid #b9c6bf; color: #40544b; font-size: 12pt; display: flex; justify-content: space-between; }
  </style>
</head>
<body>
  <header>
    <h1>Hillary Esposito</h1>
    <p class="role">UX Designer, Product Designer &amp; Researcher · Healthcare and Consumer Products</p>
    <address>
      New York City ·
      <a href="mailto:espositohillary@gmail.com">espositohillary@gmail.com</a> ·
      <a href="https://www.hillaryesposito.com">www.hillaryesposito.com</a> ·
      <a href="https://www.linkedin.com/in/hillaryesposito">linkedin.com/in/hillaryesposito</a>
    </address>
  </header>

  <main>
    <section aria-labelledby="summary-heading">
      <h2 id="summary-heading">Professional summary</h2>
      <p>UX designer, product designer and researcher with six years at a cancer center (MSK) and 13+ years of Army service. I turn frontline observation, workflow analysis, stakeholder input, and technical constraints into clearer internal tools and testable product flows. At MSK, a workflow redesign I initiated contributed to a 20% organization-wide electronic medical record (EMR) cost reduction, as part of a larger initiative. MHA, Lean Six Sigma Green Belt, U.S. Army veteran, and bilingual English/Spanish communicator.</p>
    </section>

    <section aria-labelledby="product-heading">
      <h2 id="product-heading">Product design experience</h2>
      <article aria-labelledby="grove-role">
        <h3 id="grove-role">Founder, Product Designer, Developer · Grove Plant Care</h3>
        <p class="meta">Independent product · 2025–Present · Functional prototype, Phase 2 of 3</p>
        <ul>
          <li>Narrowed 12 proposed features to 3 after synthesizing a 37-person self-report survey, then translated the priorities into information architecture, interaction states, and a functional React prototype.</li>
        </ul>
      </article>
    </section>

    <section aria-labelledby="healthcare-heading">
      <h2 id="healthcare-heading">Healthcare systems and workflow experience</h2>
      <article aria-labelledby="trainer-role">
        <h3 id="trainer-role">Training Facilitator (retitled Trainer I Specialist) · Memorial Sloan Kettering Cancer Center</h3>
        <p class="meta">New York, NY · January 2022–July 2024</p>
        <ul>
          <li>Rebuilt the learning tracks for administrative onboarding across Epic, HIPAA, compliance, and role-specific workflows for a 21,000+ person organization.</li>
        </ul>
      </article>
      <article aria-labelledby="coordinator-role">
        <h3 id="coordinator-role">Office Coordinator → Administrative Assistant · Memorial Sloan Kettering Cancer Center</h3>
        <p class="meta">New York, NY · 2018–2022</p>
        <ul>
          <li>Found patient-portal messages being printed so they could be scanned into the chart. Checked a fix with clinical, IT, HIM, and operations, then pitched a button that files them straight to the chart (pitch projected ~$1M/year).</li>
          <li>IT and UX built the button after I changed roles. It contributed to a broader organization-wide initiative that reduced EMR costs by 20%.</li>
          <li>Rewrote CPR certification language with physicians and legal. The department certified a month before the original deadline, no extension.</li>
        </ul>
      </article>
      <article aria-labelledby="army-role">
        <h3 id="army-role">Commissioned Officer · NJ Army National Guard</h3>
        <p class="meta">2013–2026 · Platoon Leader, Company Commander, Brigade Medical Supply Officer</p>
        <ul>
          <li>Cut medical resupply from 1–2 months to 1–2 weeks (85% faster per service record) by moving the warehouse into a combat zone.</li>
          <li>Built real-time order-status tracking for seven aid stations in three countries. Sites stopped over-ordering and running out, cutting spending 60%; deployment coordination improved 15%.</li>
        </ul>
      </article>
    </section>

    <section class="education" aria-labelledby="education-heading">
      <h2 id="education-heading">Education and credentials</h2>
      <p><strong>Education:</strong> Master of Healthcare Administration, with honors, Rutgers University; Bachelor of Science, Public Health, Rutgers University; Associate of Science, Valley Forge Military College</p>
      <p><strong>Credentials:</strong> Google UX Design Certificate; Lean Six Sigma Green Belt, Purdue; UX, Data Analytics, and Software Engineering Bootcamps, Noble Desktop</p>
    </section>
  </main>
</body>
</html>
"""


def healthcare_html() -> str:
    """Reuse the proven semantic document shell with healthcare-first content."""
    html = HTML
    replacements = {
        '<meta name="description" content="UX and product design résumé for healthcare and consumer products: workflows, research, and internal tools." />':
            '<meta name="description" content="Healthcare product and service design résumé focused on clinical workflows, care services, and implementation." />',
        '<title>Hillary Esposito - UX and Product Designer Resume</title>':
            '<title>Hillary Esposito - Healthcare Product and Service Designer Resume</title>',
        '<p class="role">UX Designer, Product Designer &amp; Researcher · Healthcare and Consumer Products</p>':
            '<p class="role">Healthcare Product &amp; Service Designer · Clinical Workflows &amp; Care Services</p>',
        'UX designer, product designer and researcher with six years at a cancer center (MSK) and 13+ years of Army service. I turn frontline observation, workflow analysis, stakeholder input, and technical constraints into clearer internal tools and testable product flows. At MSK, a workflow redesign I initiated contributed to a 20% organization-wide electronic medical record (EMR) cost reduction, as part of a larger initiative. MHA, Lean Six Sigma Green Belt, U.S. Army veteran, and bilingual English/Spanish communicator.':
            'Healthcare product and service designer with six years at a cancer center (MSK) and 13+ years of Army service, including medical logistics. I map what staff do, where work changes hands, and who owns the next step. I stay through prototyping and implementation. At MSK, a workflow redesign I initiated contributed to a 20% organization-wide electronic medical record (EMR) cost reduction, as part of a larger initiative. MHA, Lean Six Sigma Green Belt, Army veteran, and bilingual English/Spanish communicator.',
        '<h2 id="product-heading">Product design experience</h2>':
            '<h2 id="product-heading">Current product design</h2>',
        '<h2 id="healthcare-heading">Healthcare systems and workflow experience</h2>':
            '<h2 id="healthcare-heading">Healthcare product and service experience</h2>',
        # This variant's summary is a line longer; slightly tighter leading keeps it to one page.
        'font-size: 12pt; line-height: 1.22; }':
            'font-size: 12pt; line-height: 1.19; }',
    }
    for old, new in replacements.items():
        if old not in html:
            raise RuntimeError(f"Semantic résumé source marker changed: {old[:70]}")
        html = html.replace(old, new, 1)

    product_start = html.index('<section aria-labelledby="product-heading">')
    product_end = html.index("</section>", product_start) + len("</section>")
    healthcare_start = html.index('<section aria-labelledby="healthcare-heading">')
    healthcare_end = html.index("</section>", healthcare_start) + len("</section>")
    product_section = html[product_start:product_end]
    healthcare_section = html[healthcare_start:healthcare_end]
    return (
        html[:product_start]
        + healthcare_section
        + "\n\n    "
        + product_section
        + html[healthcare_end:]
    )


def build_pdf(variant: str = "portfolio") -> Path:
    if not CHROME.is_file():
        raise FileNotFoundError(
            f"Chrome was not found at {CHROME}. Set PORTFOLIO_CHROME_BIN to a Chromium executable."
        )

    filename = FILENAMES[variant]
    source_html = HTML if variant == "portfolio" else healthcare_html()

    with tempfile.TemporaryDirectory(prefix=f"{variant}-resume-") as temp_name:
        temp_dir = Path(temp_name)
        html_path = temp_dir / "resume.html"
        pdf_path = temp_dir / filename
        html_path.write_text(source_html, encoding="utf-8")

        subprocess.run(
            [
                str(CHROME),
                "--headless=new",
                "--disable-gpu",
                "--no-sandbox",
                "--export-tagged-pdf",
                "--no-pdf-header-footer",
                "--print-to-pdf-no-header",
                f"--print-to-pdf={pdf_path}",
                html_path.as_uri(),
            ],
            check=True,
        )

        if not pdf_path.is_file():
            raise RuntimeError("Chrome completed without producing the résumé PDF.")

        destinations = [
            ROOT / "my-app/public/assets" / filename,
        ]
        for destination in destinations:
            destination.parent.mkdir(parents=True, exist_ok=True)
            copyfile(pdf_path, destination)
            print(destination)
        return destinations[0]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--variant",
        choices=["portfolio", "healthcare", "all"],
        default="portfolio",
        help="Semantic résumé variant to export (default: portfolio).",
    )
    args = parser.parse_args()
    variants = FILENAMES if args.variant == "all" else (args.variant,)
    for variant in variants:
        build_pdf(variant)


if __name__ == "__main__":
    main()
