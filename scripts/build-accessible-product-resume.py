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
  <meta name="description" content="Healthcare Product Designer résumé focused on enterprise workflows, internal tools, and complex healthcare systems." />
  <title>Hillary Esposito - Healthcare Product Designer Resume</title>
  <style>
    @page { size: Letter; margin: 0.35in 0.45in 0.4in; }
    * { box-sizing: border-box; }
    html { color: #17251f; background: #fff; font-family: Arial, Helvetica, sans-serif; font-size: 8.5pt; line-height: 1.22; }
    body { margin: 0; }
    header { text-align: center; margin-bottom: 0.065in; }
    h1 { margin: 0; font-size: 20pt; line-height: 1; letter-spacing: 0.015em; }
    .role { margin: 0.045in 0 0.02in; color: #285943; font-size: 9pt; font-weight: 700; letter-spacing: 0.024em; text-transform: uppercase; }
    address { color: #40544b; font-style: normal; font-size: 8pt; }
    a { color: #285943; text-decoration: underline; text-decoration-thickness: 0.5px; text-underline-offset: 1px; }
    main { display: block; }
    section { break-inside: avoid; }
    h2 { margin: 0.055in 0 0.02in; padding-top: 0.012in; color: #285943; font-size: 9.15pt; line-height: 1.08; letter-spacing: 0.04em; text-transform: uppercase; border-top: 0.55px solid #b9c6bf; }
    h3 { margin: 0.035in 0 0; font-size: 8.8pt; line-height: 1.1; }
    p { margin: 0.012in 0; }
    .meta { color: #4a5b53; font-style: italic; font-size: 7.9pt; }
    ul { margin: 0.012in 0 0.02in; padding-left: 0.16in; }
    li { margin: 0.008in 0; padding-left: 0.008in; }
    .skills p { margin: 0.008in 0; }
    .education { font-size: 8pt; }
    footer { margin-top: 0.045in; padding-top: 0.035in; border-top: 0.55px solid #b9c6bf; color: #40544b; font-size: 6.8pt; display: flex; justify-content: space-between; }
  </style>
</head>
<body>
  <header>
    <h1>Hillary Esposito</h1>
    <p class="role">Healthcare Product Designer · Enterprise Workflows, Internal Tools &amp; Complex Systems</p>
    <address>
      New York City · 908-616-2712 ·
      <a href="mailto:espositohillary@gmail.com">espositohillary@gmail.com</a> ·
      <a href="https://hillaryesposito.org">hillaryesposito.org</a> ·
      <a href="https://www.linkedin.com/in/hillaryesposito">linkedin.com/in/hillaryesposito</a>
    </address>
  </header>

  <main>
    <section aria-labelledby="summary-heading">
      <h2 id="summary-heading">Professional summary</h2>
      <p>Healthcare Product Designer with 13+ years inside high-stakes healthcare and military systems. Combines frontline observation, workflow analysis, stakeholder input, and technical constraints to design clearer internal tools and testable product flows. At Memorial Sloan Kettering, a workflow redesign I initiated later contributed inside a larger initiative to a 20% organization-wide electronic medical record cost reduction. MHA, Lean Six Sigma Green Belt, U.S. Army veteran, and bilingual English/Spanish communicator.</p>
    </section>

    <section class="skills" aria-labelledby="skills-heading">
      <h2 id="skills-heading">Core skills</h2>
      <p><strong>Product and interaction:</strong> information architecture, user flows, wireframes, functional prototypes, interaction states, accessibility, responsive design, design systems, design QA</p>
      <p><strong>Research and service design:</strong> workflow observation, stakeholder interviews, survey synthesis, usability testing, journey mapping, service blueprints, task analysis, scope prioritization</p>
      <p><strong>Tools and domain:</strong> Figma, FigJam, Miro, Notion, React, HTML/CSS, AI-assisted prototyping, healthcare operations, EMR workflows, Lean Six Sigma</p>
    </section>

    <section aria-labelledby="product-heading">
      <h2 id="product-heading">Product design experience</h2>
      <article aria-labelledby="grove-role">
        <h3 id="grove-role">Founder, Product Designer, Developer · Grove Plant Care</h3>
        <p class="meta">Independent product · 2025–Present · Functional prototype, Phase 2 of 3</p>
        <ul>
          <li>Narrowed 11 proposed features to 3 after synthesizing a 34-person self-report survey, then translated the priorities into information architecture, interaction states, and a functional React prototype.</li>
          <li>Own research planning, product scope, responsive interaction design, accessibility, prototype implementation, and iteration. The prototype is not presented as a shipped consumer product.</li>
        </ul>
      </article>
      <article aria-labelledby="mobbin-role">
        <h3 id="mobbin-role">Content Designer, Contract · Mobbin</h3>
        <p class="meta">Remote · March–June 2026</p>
        <ul>
          <li>Documented 200+ mobile screens per app across Kikoff, Polymarket, and Discover, mapping navigation, interaction patterns, visual hierarchy, and microcopy for a reusable UX reference library.</li>
          <li>Applied a consistent taxonomy so product and design teams could compare complete finance-app flows. The assignment covered documentation, not ownership of the products.</li>
        </ul>
      </article>
    </section>

    <section aria-labelledby="healthcare-heading">
      <h2 id="healthcare-heading">Healthcare systems and workflow experience</h2>
      <article aria-labelledby="trainer-role">
        <h3 id="trainer-role">Trainer / Specialist · Memorial Sloan Kettering Cancer Center</h3>
        <p class="meta">New York, NY · January 2022–July 2024</p>
        <ul>
          <li>Rebuilt administrative onboarding across Epic, HIPAA, compliance, and role-specific workflows for a 21,000+ person organization.</li>
          <li>Partnered with clinical, IT, imaging, and operations stakeholders to clarify ownership, exceptions, and handoffs across complex internal processes.</li>
        </ul>
      </article>
      <article aria-labelledby="coordinator-role">
        <h3 id="coordinator-role">Administrative Assistant / Office Coordinator · Memorial Sloan Kettering Cancer Center</h3>
        <p class="meta">New York, NY · 2018–2022</p>
        <ul>
          <li>Mapped a paper-to-digital EMR workflow across four departments and presented the redesign. MSK implemented it two roles later inside a broader initiative that reduced organization-wide EMR costs by 20%.</li>
          <li>Rewrote technical and legal CPR certification material around clinician questions and handoffs, enabling every certification to be collected 70% ahead of an at-risk deadline.</li>
        </ul>
      </article>
      <article aria-labelledby="army-role">
        <h3 id="army-role">Commissioned Officer · NJ Army National Guard</h3>
        <p class="meta">2013–2026 · Platoon Leader, Company Commander, Brigade Medical Supply Officer</p>
        <ul>
          <li>Cut medical resupply time by 85% and spending by 60%, and improved deployment coordination by 15% across seven aid stations in three countries through shared tracking and reporting workflows.</li>
          <li>Directed medical logistics for 5,000+ soldiers and $2M in supplies in Iraq while absorbing a vacant Medical Operations Officer role and reporting medical operations to the Pentagon.</li>
        </ul>
      </article>
    </section>

    <section class="education" aria-labelledby="education-heading">
      <h2 id="education-heading">Education and credentials</h2>
      <p><strong>Education:</strong> Master of Healthcare Administration, with honors, Rutgers University; Bachelor of Science, Public Health, Rutgers University; Associate of Science, Valley Forge Military College</p>
      <p><strong>Credentials:</strong> Google UX Design Certificate; Lean Six Sigma Green Belt, Purdue; UX, Data Analytics, and Software Engineering Bootcamps, Noble Desktop</p>
    </section>
  </main>

  <footer aria-label="Document information">
    <span>Hillary Esposito · Healthcare Product Design</span>
    <span>Updated August 2026</span>
  </footer>
</body>
</html>
"""


def healthcare_html() -> str:
    """Reuse the proven semantic document shell with healthcare-first content."""
    html = HTML
    replacements = {
        '<meta name="description" content="Healthcare Product Designer résumé focused on enterprise workflows, internal tools, and complex healthcare systems." />':
            '<meta name="description" content="Healthcare product and service design résumé focused on clinical workflows, care services, and implementation." />',
        '<title>Hillary Esposito - Healthcare Product Designer Resume</title>':
            '<title>Hillary Esposito - Healthcare Product and Service Designer Resume</title>',
        '<p class="role">Healthcare Product Designer · Enterprise Workflows, Internal Tools &amp; Complex Systems</p>':
            '<p class="role">Healthcare Product &amp; Service Designer · Clinical Workflows &amp; Care Services</p>',
        'Healthcare Product Designer with 13+ years inside high-stakes healthcare and military systems. Combines frontline observation, workflow analysis, stakeholder input, and technical constraints to design clearer internal tools and testable product flows. At Memorial Sloan Kettering, a workflow redesign I initiated later contributed inside a larger initiative to a 20% organization-wide electronic medical record cost reduction. MHA, Lean Six Sigma Green Belt, U.S. Army veteran, and bilingual English/Spanish communicator.':
            'Healthcare product and service designer with 13+ years inside cancer-care operations and military medical logistics. I map what staff do, where work changes hands, and who owns the next step. I stay through prototyping and implementation. An MSK workflow redesign I initiated contributed inside a larger initiative to a 20% organization-wide EMR cost reduction. MHA, Lean Six Sigma Green Belt, Army veteran, and bilingual English/Spanish communicator.',
        '<p><strong>Product and interaction:</strong> information architecture, user flows, wireframes, functional prototypes, interaction states, accessibility, responsive design, design systems, design QA</p>':
            '<p><strong>Healthcare product/service:</strong> clinical workflows, current/future-state mapping, journey mapping, service blueprinting, internal tools, change management, implementation, accessibility</p>',
        '<p><strong>Research and service design:</strong> workflow observation, stakeholder interviews, survey synthesis, usability testing, journey mapping, service blueprints, task analysis, scope prioritization</p>':
            '<p><strong>Product and research:</strong> information architecture, task analysis, stakeholder interviews, workflow observation, survey synthesis, usability testing, functional prototypes, design systems</p>',
        '<p><strong>Tools and domain:</strong> Figma, FigJam, Miro, Notion, React, HTML/CSS, AI-assisted prototyping, healthcare operations, EMR workflows, Lean Six Sigma</p>':
            '<p><strong>Tools and domain:</strong> Figma, FigJam, Miro, React, HTML/CSS, Epic/EMR workflows, healthcare operations, medical logistics, Lean Six Sigma</p>',
        '<h2 id="product-heading">Product design experience</h2>':
            '<h2 id="product-heading">Current product design</h2>',
        '<h2 id="healthcare-heading">Healthcare systems and workflow experience</h2>':
            '<h2 id="healthcare-heading">Healthcare product and service experience</h2>',
        '<span>Hillary Esposito · Healthcare Product Design</span>':
            '<span>Hillary Esposito · Healthcare Product + Service Design</span>',
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
            ROOT / "docs/assets" / filename,
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
