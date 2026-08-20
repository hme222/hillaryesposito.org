#!/usr/bin/env python3
"""Build the evidence-safe, ATS-readable portfolio resume PDF."""

from pathlib import Path
from shutil import copyfile

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = {
    "portfolio": "Hillary_Esposito_Portfolio_Resume.pdf",
    "healthcare": "Hillary_Esposito_Healthcare_Product_Service_Designer_Resume.pdf",
    "uxr": "Hillary_Esposito_Healthcare_UX_Research_Resume.pdf",
    "plant": "Hillary_Esposito_The_Sill_Product_Designer_Resume.pdf",
}

INK = colors.HexColor("#17251F")
GREEN = colors.HexColor("#285943")
MUTED = colors.HexColor("#4A5B53")
RULE = colors.HexColor("#B9C6BF")


def build_styles():
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=19,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=2,
        ),
        "headline": ParagraphStyle(
            "Headline",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.6,
            leading=10.5,
            textColor=GREEN,
            alignment=TA_CENTER,
            tracking=0.35,
            spaceAfter=2,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=10.2,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=6,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.1,
            leading=10.4,
            textColor=GREEN,
            borderColor=RULE,
            borderWidth=0,
            borderPadding=0,
            spaceBefore=4.5,
            spaceAfter=2.4,
            tracking=0.6,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=11.15,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=1.5,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.95,
            leading=10.6,
            textColor=INK,
            spaceBefore=2.5,
            spaceAfter=0,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=8.2,
            leading=9.8,
            textColor=MUTED,
            spaceAfter=1,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.55,
            leading=10.75,
            textColor=INK,
            leftIndent=9,
            firstLineIndent=-6,
            bulletIndent=0,
            bulletFontName="Helvetica",
            bulletFontSize=6.5,
            spaceAfter=1.2,
        ),
        "compact": ParagraphStyle(
            "Compact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.25,
            leading=10.25,
            textColor=INK,
            spaceAfter=1.2,
        ),
    }


def section(story, styles, title):
    story.append(Paragraph(title.upper(), styles["section"]))


def bullet(story, styles, text):
    story.append(Paragraph(text, styles["bullet"], bulletText="•"))


def role(story, styles, title, org, place_dates, bullets):
    block = [
        Paragraph(f"{title} | {org}", styles["role"]),
        Paragraph(place_dates, styles["meta"]),
    ]
    for item in bullets:
        block.append(Paragraph(item, styles["bullet"], bulletText="•"))
    story.append(KeepTogether(block))


def page_decor(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.white)
    canvas.rect(0, 0, LETTER[0], LETTER[1], stroke=0, fill=1)
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.55)
    canvas.line(doc.leftMargin, 0.42 * inch, LETTER[0] - doc.rightMargin, 0.42 * inch)
    canvas.setFont("Helvetica", 6.8)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 0.27 * inch, getattr(doc, "footer_label", "HILLARY ESPOSITO · PRODUCT DESIGN"))
    canvas.drawRightString(LETTER[0] - doc.rightMargin, 0.27 * inch, "UPDATED AUGUST 2026")
    canvas.restoreState()


def build_resume(output_path, variant="portfolio"):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    styles = build_styles()
    configs = {
        "portfolio": {
            "headline": "PRODUCT DESIGNER | HEALTHCARE SYSTEMS, INTERNAL TOOLS &amp; COMPLEX WORKFLOWS",
            "title": "Hillary Esposito - Product Designer Resume",
            "subject": "Product design resume focused on healthcare systems, internal tools, and complex workflows",
            "footer": "HILLARY ESPOSITO · PRODUCT DESIGN",
            "summary": (
                "Product designer with 13+ years working inside high-stakes healthcare and military systems. "
                "Turns frontline observation, workflow analysis, stakeholder input, and technical constraints into "
                "clearer internal tools and testable product flows. Initiated an MSK workflow redesign that later "
                "contributed to a 20% organization-wide EMR cost reduction. MHA, Lean Six Sigma Green Belt, U.S. "
                "Army veteran, and bilingual English/Spanish communicator."
            ),
            "skills": (
                "<b>Product and interaction:</b> information architecture, user flows, wireframes, functional prototypes, "
                "interaction states, accessibility, responsive design, design systems, design QA<br/>"
                "<b>Research and systems:</b> workflow observation, stakeholder interviews, survey synthesis, usability "
                "testing, journey mapping, service blueprints, task analysis, scope prioritization<br/>"
                "<b>Tools and domain:</b> Figma, FigJam, Miro, Notion, React, HTML/CSS, AI-assisted prototyping, "
                "healthcare operations, EMR workflows, Lean Six Sigma"
            ),
        },
        "healthcare": {
            "headline": "HEALTHCARE PRODUCT &amp; SERVICE DESIGNER | CLINICAL WORKFLOWS &amp; CARE SERVICES",
            "title": "Hillary Esposito - Healthcare Product and Service Designer Resume",
            "subject": "Healthcare product and service design resume focused on clinical workflows and end-to-end services",
            "footer": "HILLARY ESPOSITO · HEALTHCARE PRODUCT + SERVICE DESIGN",
            "summary": (
                "Healthcare product and service designer with 13+ years inside cancer-care operations and military "
                "medical logistics. Maps frontstage tasks to backstage people, systems, permissions, and handoffs; "
                "then carries changes through prototyping, stakeholder alignment, implementation, and adoption. "
                "Initiated an MSK workflow redesign that contributed inside a larger initiative to a 20% organization-wide "
                "EMR cost reduction. MHA, Lean Six Sigma Green Belt, Army veteran, and bilingual English/Spanish communicator."
            ),
            "skills": (
                "<b>Healthcare product/service:</b> clinical workflows, current/future-state mapping, journey mapping, "
                "service blueprinting, internal tools, change management, implementation, accessibility<br/>"
                "<b>Product and research:</b> information architecture, task analysis, stakeholder interviews, workflow "
                "observation, survey synthesis, usability testing, functional prototypes, design systems<br/>"
                "<b>Tools and domain:</b> Figma, FigJam, Miro, React, HTML/CSS, Epic/EMR workflows, healthcare operations, "
                "medical logistics, Lean Six Sigma"
            ),
        },
        "uxr": {
            "headline": "HEALTHCARE UX RESEARCH | WORKFLOW, PRODUCT &amp; SERVICE DECISIONS",
            "title": "Hillary Esposito - Healthcare UX Research Resume",
            "subject": "Healthcare UX research resume focused on workflow research, evaluative studies, and research-to-decision evidence",
            "footer": "HILLARY ESPOSITO · HEALTHCARE UX RESEARCH",
            "summary": (
                "Healthcare UX research and product practitioner with 13+ years inside cancer-care operations and medical "
                "logistics. Uses workflow observation, stakeholder input, surveys, usability studies, and task analysis to "
                "change product and service decisions. A 34-person Grove self-report survey narrowed 11 proposed features "
                "to 3; MSK workflow analysis aligned four departments around an implemented digital process. The Grove "
                "survey is bounded as self-report; the earlier MSK observation count was not preserved."
            ),
            "skills": (
                "<b>Research:</b> research planning, workflow observation, stakeholder interviews, survey synthesis, "
                "moderated usability testing, task analysis, qualitative synthesis, evidence limitations<br/>"
                "<b>Decision artifacts:</b> current/future-state maps, journey maps, service blueprints, research-to-scope "
                "traces, findings and recommendations, functional prototypes<br/>"
                "<b>Domain and tools:</b> healthcare operations, Epic/EMR workflows, public health, Figma, FigJam, Miro, "
                "React prototypes, accessibility, Lean Six Sigma"
            ),
        },
        "plant": {
            "headline": "PRODUCT / UX DESIGNER | PLANT CARE, CONSUMER PRODUCTS &amp; TRUSTWORTHY AI",
            "title": "Hillary Esposito - The Sill Product Designer Resume",
            "subject": "Consumer product design resume tailored to plant care, education, onboarding, and ongoing-care experiences",
            "footer": "HILLARY ESPOSITO · PLANT + CONSUMER PRODUCT DESIGN",
            "summary": (
                "Product/UX designer building Grove, a functional plant-care prototype in Phase 2 of 3. Synthesized a "
                "34-person self-report survey to cut 11 proposed features to 3, then redesigned care, plant identification, "
                "confidence, sources, and pet-safety decisions around calm ongoing use. Brings consumer interaction craft, "
                "accessibility, coded prototyping, and 13+ years designing for trust in high-stakes systems."
            ),
            "skills": (
                "<b>Consumer product:</b> onboarding, information architecture, care loops, notification strategy, "
                "responsive interaction design, accessibility, design systems, functional prototypes<br/>"
                "<b>Research and trust:</b> survey synthesis, usability testing, scope prioritization, AI confidence, source "
                "provenance, pet-safety information, human override, evidence limitations<br/>"
                "<b>Tools:</b> Figma, FigJam, Miro, Notion, React, HTML/CSS, AI-assisted prototyping, design QA"
            ),
        },
    }
    config = configs[variant]
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=LETTER,
        leftMargin=0.47 * inch,
        rightMargin=0.47 * inch,
        topMargin=0.37 * inch,
        bottomMargin=0.5 * inch,
        title=config["title"],
        author="Hillary Esposito",
        subject=config["subject"],
    )
    doc.footer_label = config["footer"]

    story = [
        Paragraph("HILLARY ESPOSITO", styles["name"]),
        Paragraph(
            config["headline"],
            styles["headline"],
        ),
        Paragraph(
            'New York City | 908-616-2712 | '
            '<a href="mailto:espositohillary@gmail.com" color="#285943">espositohillary@gmail.com</a> | '
            '<a href="https://hillaryesposito.org" color="#285943">hillaryesposito.org</a> | '
            '<a href="https://www.linkedin.com/in/hillaryesposito" color="#285943">linkedin.com/in/hillaryesposito</a>',
            styles["contact"],
        ),
    ]

    section(story, styles, "Professional Summary")
    story.append(
        Paragraph(
            config["summary"],
            styles["body"],
        )
    )

    section(story, styles, "Core Skills")
    story.append(
        Paragraph(
            config["skills"],
            styles["compact"],
        )
    )

    def add_mobbin():
        role(
            story,
            styles,
            "Content Designer, Contract",
            "Mobbin",
            "Remote | Mar 2026 - Jun 2026",
            [
                "Documented 200+ mobile screens per app across Kikoff, Polymarket, and Discover, mapping navigation, interaction patterns, visual hierarchy, and microcopy for a reusable UX reference library.",
                "Applied a consistent taxonomy and review standard so product and design teams could find and compare complete finance-app flows; assignment covered documentation, not ownership of the products.",
            ],
        )

    def add_grove():
        role(
            story,
            styles,
            "Founder, Product Designer, Developer",
            "Grove - Plant Care App",
            "Independent product | 2025 - Present | Functional prototype, Phase 2 of 3",
            [
                "Narrowed 11 proposed features to 3 after synthesizing a 34-person self-report survey, then translated the priorities into information architecture, interaction states, and a functional React prototype.",
                "Owns research planning, product scope, responsive interaction design, accessibility, prototype implementation, and iteration; prototype is not presented as a shipped consumer product.",
            ],
        )

    def add_msk():
        role(
            story,
            styles,
            "Trainer / Specialist",
            "Memorial Sloan Kettering Cancer Center",
            "New York, NY | Jan 2022 - Jul 2024",
            [
                "Rebuilt administrative onboarding across Epic, HIPAA, compliance, and role-specific workflows using staff feedback, clearer sequencing, and reusable training materials for a 21,000+ person organization.",
                "Partnered with clinical, IT, imaging, and operations stakeholders to clarify ownership, exceptions, and handoffs across complex internal processes.",
            ],
        )
        role(
            story,
            styles,
            "Administrative Assistant / Office Coordinator",
            "Memorial Sloan Kettering Cancer Center",
            "New York, NY | 2018 - 2022",
            [
                "Mapped a paper-to-digital EMR workflow across four departments and presented the redesign. MSK implemented it two roles later as part of a broader initiative that reduced organization-wide EMR costs by 20%.",
                "Rewrote technical and legal CPR certification material around clinician questions and handoffs, enabling every certification to be collected 70% ahead of a deadline that had been at risk of slipping.",
            ],
        )

    def add_army():
        role(
            story,
            styles,
            "Commissioned Officer",
            "NJ Army National Guard",
            "2013 - 2026 | Platoon Leader, Company Commander, Brigade Medical Supply Officer",
            [
                "Cut medical resupply time by 85% and spending by 60%, and improved deployment coordination by 15% across seven aid stations in three countries through shared tracking and reporting workflows.",
                "Directed medical logistics for 5,000+ soldiers and $2M in supplies in Iraq while absorbing a vacant Medical Operations Officer role and reporting medical operations to the Pentagon.",
            ],
        )

    if variant == "healthcare":
        section(story, styles, "Healthcare Product and Service Experience")
        add_msk()
        add_army()
        section(story, styles, "Current Product Design")
        add_grove()
        add_mobbin()
    elif variant == "uxr":
        section(story, styles, "Research and Product Evidence")
        add_grove()
        section(story, styles, "Healthcare Workflow Research and Service Experience")
        add_msk()
        add_army()
        section(story, styles, "Additional Product Documentation")
        add_mobbin()
    elif variant == "plant":
        section(story, styles, "Consumer Product Design")
        add_grove()
        add_mobbin()
        section(story, styles, "Healthcare Systems and Service Experience")
        add_msk()
        add_army()
    else:
        section(story, styles, "Product Design Experience")
        add_mobbin()
        add_grove()
        section(story, styles, "Systems and Healthcare Experience")
        add_msk()
        add_army()

    section(story, styles, "Education and Credentials")
    story.append(
        Paragraph(
            "<b>Education:</b> Master of Healthcare Administration, with honors, Rutgers University; "
            "Bachelor of Science, Public Health, Rutgers University; Associate of Science, Valley Forge Military College<br/>"
            "<b>Credentials:</b> Google UX Design Certificate; Lean Six Sigma Green Belt, Purdue; UX, Data Analytics "
            "and Software Engineering Bootcamps, Noble Desktop",
            styles["compact"],
        )
    )

    doc.build(story, onFirstPage=page_decor, onLaterPages=page_decor)


def main():
    temp_dir = ROOT / "tmp/pdfs"
    temp_dir.mkdir(parents=True, exist_ok=True)
    for variant, filename in OUTPUTS.items():
        temp_output = temp_dir / filename
        build_resume(temp_output, variant)
        for base_dir in (ROOT / "my-app/public/assets", ROOT / "docs/assets"):
            destination = base_dir / filename
            destination.parent.mkdir(parents=True, exist_ok=True)
            copyfile(temp_output, destination)
            print(destination)


if __name__ == "__main__":
    main()
