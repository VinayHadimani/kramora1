#!/usr/bin/env python3
"""Generate the Kramora AI capability deck PDF (light, on-brand)."""

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

W, H = LETTER
BLUE = HexColor("#2563EB")
BLUE_LIGHT = HexColor("#DBEAFE")
BLUE_50 = HexColor("#EFF6FF")
SLATE_900 = HexColor("#0F172A")
SLATE_500 = HexColor("#64748B")
SLATE_200 = HexColor("#E2E8F0")
SLATE_400 = HexColor("#94A3B8")

OUT = "/home/z/my-project/public/kramora-capability-deck.pdf"

c = canvas.Canvas(OUT, pagesize=LETTER)
c.setTitle("Kramora AI — Capability Deck")
c.setAuthor("Kramora AI")


def k_mark(x, y, s=40):
    c.setFillColor(BLUE)
    c.roundRect(x, y, s, s, s * 0.25, stroke=0, fill=1)
    c.setStrokeColor(HexColor("#FFFFFF"))
    c.setLineWidth(s * 0.09)
    c.setLineCap(1)
    c.line(x + s * 0.31, y + s * 0.27, x + s * 0.31, y + s * 0.73)
    p = c.beginPath()
    p.moveTo(x + s * 0.69, y + s * 0.27)
    p.lineTo(x + s * 0.42, y + s * 0.5)
    p.lineTo(x + s * 0.69, y + s * 0.73)
    c.drawPath(p, stroke=1, fill=0)


def header(page_no):
    k_mark(0.75 * inch, H - 0.95 * inch, 26)
    c.setFillColor(SLATE_900)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(1.12 * inch, H - 0.83 * inch, "Kramora")
    c.setFillColor(BLUE)
    c.drawString(1.12 * inch + c.stringWidth("Kramora", "Helvetica-Bold", 13), H - 0.83 * inch, " AI")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(SLATE_400)
    c.drawRightString(W - 0.75 * inch, H - 0.83 * inch, f"Capability Deck · {page_no}")
    c.setStrokeColor(SLATE_200)
    c.setLineWidth(0.7)
    c.line(0.75 * inch, H - 1.02 * inch, W - 0.75 * inch, H - 1.02 * inch)


def footer():
    c.setFont("Helvetica", 8)
    c.setFillColor(SLATE_400)
    c.drawString(0.75 * inch, 0.55 * inch, "ashu@kramoraa.com · Issaquah, WA (US HQ) · Bengaluru, India")
    c.drawRightString(W - 0.75 * inch, 0.55 * inch, "We reply within 24 hours")


# ---------------------------------------------------------------- page 1
c.setFillColor(SLATE_900)
c.setFont("Helvetica-Bold", 30)
c.drawString(0.75 * inch, H - 2.4 * inch, "We build intelligent")
c.drawString(0.75 * inch, H - 2.95 * inch, "products that scale.")

c.setFillColor(BLUE)
c.setFont("Helvetica-Bold", 12.5)
c.drawString(0.75 * inch, H - 3.5 * inch, "AI-First. Innovation-Driven. Built for Growth.")

c.setFillColor(SLATE_500)
c.setFont("Helvetica", 10.5)
for i, line in enumerate(
    [
        "Kramora AI is an AI-first engineering agency. Senior-only pods deliver custom ML,",
        "LLM applications, RAG systems, data platforms, cloud infrastructure, and the",
        "products on top of them - from idea to production, in weeks.",
    ]
):
    c.drawString(0.75 * inch, H - (4.15 + i * 0.22) * inch, line)

# stats band
band_y = H - 6.2 * inch
c.setFillColor(BLUE_50)
c.roundRect(0.75 * inch, band_y, W - 1.5 * inch, 1.35 * inch, 10, stroke=0, fill=1)
stats = [("2-3x", "Faster delivery"), ("97%", "Client retention"), ("24/7", "Delivery coverage"), ("5.0", "Average rating")]
seg = (W - 1.5 * inch) / 4
for i, (v, l) in enumerate(stats):
    cx = 0.75 * inch + seg * i + seg / 2
    c.setFillColor(SLATE_900)
    c.setFont("Helvetica-Bold", 20)
    c.drawCentredString(cx, band_y + 0.72 * inch, v)
    c.setFillColor(BLUE)
    c.setFont("Helvetica", 9)
    c.drawCentredString(cx, band_y + 0.42 * inch, l)

# the 8 hubs
c.setFillColor(SLATE_900)
c.setFont("Helvetica-Bold", 15)
c.drawString(0.75 * inch, band_y - 0.75 * inch, "The 8 technical hubs")
hubs = [
    ("AI & Generative AI", "ML · NLP · LLM apps · RAG · agents"),
    ("Data Engineering", "ETL/ELT · streaming · warehousing"),
    ("Cloud & DevOps", "Kubernetes · multi-cloud · SRE"),
    ("Web Development", "Next.js · React · design systems"),
    ("Mobile Development", "React Native · iOS · Android"),
    ("Intelligent Automation", "Workflows · RPA · orchestration"),
    ("OCR & Document AI", "IDP · extraction at 4,200 docs/hr"),
    ("Staff Augmentation", "Dedicated teams · managed pods"),
]
gy = band_y - 1.25 * inch
col_w = (W - 1.7 * inch) / 2
for i, (name, desc) in enumerate(hubs):
    col = i % 2
    row = i // 2
    x = 0.85 * inch + col * (col_w + 0.1 * inch)
    y = gy - row * 0.62 * inch
    c.setFillColor(BLUE_LIGHT)
    c.circle(x + 0.045 * inch, y + 0.045 * inch, 0.045 * inch, stroke=0, fill=1)
    c.setFillColor(SLATE_900)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(x + 0.16 * inch, y + 0.02 * inch, name)
    c.setFillColor(SLATE_500)
    c.setFont("Helvetica", 8.5)
    c.drawString(x + 0.16 * inch, y - 0.16 * inch, desc)

footer()
c.showPage()

# ---------------------------------------------------------------- page 2
header(2)
c.setFillColor(SLATE_900)
c.setFont("Helvetica-Bold", 19)
c.drawString(0.75 * inch, H - 1.45 * inch, "Featured outcomes")

cases = [
    (
        "Insurance - Generative AI underwriting",
        "4,200 documents/hour processed · 81% less manual review · 6 weeks to production · 99.2% extraction accuracy",
    ),
    (
        "FinTech - Real-time risk platform",
        "40ms p99 decision latency · 3.4B events/day · 99.99% uptime · 5-week zero-downtime migration",
    ),
    (
        "Healthcare - Claims Document AI",
        "92% straight-through processing · 4x faster adjudication · HIPAA-aligned workflows",
    ),
    (
        "Logistics - Autonomous operations",
        "38% operating cost reduction · 500+ workflows automated · 24/7 autonomous coverage",
    ),
]
y = H - 1.85 * inch
for title, desc in cases:
    c.setFillColor(HexColor("#FFFFFF"))
    c.setStrokeColor(SLATE_200)
    c.roundRect(0.75 * inch, y - 0.62 * inch, W - 1.5 * inch, 0.85 * inch, 8, stroke=1, fill=1)
    c.setFillColor(BLUE)
    c.roundRect(0.75 * inch, y - 0.62 * inch, 0.055 * inch, 0.85 * inch, 3, stroke=0, fill=1)
    c.setFillColor(SLATE_900)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(1.0 * inch, y + 0.02 * inch, title)
    c.setFillColor(SLATE_500)
    c.setFont("Helvetica", 9)
    c.drawString(1.0 * inch, y - 0.22 * inch, desc)
    y -= 1.02 * inch

c.setFillColor(SLATE_900)
c.setFont("Helvetica-Bold", 19)
c.drawString(0.75 * inch, y - 0.1 * inch, "The process - four moves")
steps = [
    ("01 Discover", "Weeks 0-2", "Outcomes, constraints, data reality mapped; ruthless scope agreed."),
    ("02 Design", "Weeks 2-4", "Architecture and data contracts reviewed with your engineers."),
    ("03 Build", "Weeks 4-10", "Weekly demos of working software, shipped in vertical slices."),
    ("04 Scale", "Ongoing", "Hardening, monitoring, model drift alerts, 24/7 coverage."),
]
y -= 0.55 * inch
for title, dur, desc in steps:
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(0.85 * inch, y, title)
    c.setFillColor(SLATE_400)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(2.05 * inch, y, dur)
    c.setFillColor(SLATE_500)
    c.setFont("Helvetica", 9)
    c.drawString(0.85 * inch, y - 0.2 * inch, desc)
    y -= 0.52 * inch

footer()
c.showPage()

# ---------------------------------------------------------------- page 3
header(3)
c.setFillColor(SLATE_900)
c.setFont("Helvetica-Bold", 19)
c.drawString(0.75 * inch, H - 1.45 * inch, "Three ways to plug us in")

models = [
    (
        "Fixed Scope",
        "Best for defined outcomes",
        "Committed timeline and budget · weekly demos · UAT, handover, 30-day warranty.",
    ),
    (
        "Dedicated Pods  ·  MOST POPULAR",
        "Best for compounding velocity",
        "Senior-only cross-functional pod · backlog-driven delivery · scale on demand · retainer pricing, pause anytime.",
    ),
    (
        "Staff Augmentation",
        "Best for elastic capacity",
        "Vetted senior engineers in your rituals · skills-matched in under a week · two-week replacement guarantee.",
    ),
]
y = H - 1.9 * inch
for title, best, desc in models:
    popular = "MOST POPULAR" in title
    c.setFillColor(BLUE_50 if popular else HexColor("#FFFFFF"))
    c.setStrokeColor(BLUE if popular else SLATE_200)
    c.setLineWidth(1.4 if popular else 0.8)
    c.roundRect(0.75 * inch, y - 0.72 * inch, W - 1.5 * inch, 0.98 * inch, 8, stroke=1, fill=1)
    c.setFillColor(BLUE if popular else SLATE_900)
    c.setFont("Helvetica-Bold", 11.5)
    c.drawString(1.0 * inch, y + 0.08 * inch, title)
    c.setFillColor(SLATE_500)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(1.0 * inch, y - 0.13 * inch, best)
    c.setFont("Helvetica", 9)
    c.drawString(1.0 * inch, y - 0.33 * inch, desc)
    y -= 1.18 * inch

c.setFillColor(SLATE_900)
c.setFont("Helvetica-Bold", 19)
c.drawString(0.75 * inch, y - 0.05 * inch, "Let's build.")
c.setFillColor(SLATE_500)
c.setFont("Helvetica", 10.5)
c.drawString(0.75 * inch, y - 0.32 * inch, "Book a free 30-minute strategy call - we reply within 24 hours.")
c.setFillColor(BLUE)
c.roundRect(0.75 * inch, y - 0.98 * inch, 2.65 * inch, 0.44 * inch, 22, stroke=0, fill=1)
c.setFillColor(HexColor("#FFFFFF"))
c.setFont("Helvetica-Bold", 10.5)
c.drawCentredString(0.75 * inch + 1.325 * inch, y - 0.845 * inch, "ashu@kramoraa.com")

c.setFillColor(SLATE_500)
c.setFont("Helvetica", 9)
c.drawString(0.75 * inch, y - 1.4 * inch, "United States HQ - Issaquah, Washington    |    India Delivery Hub - Bengaluru, Karnataka")
c.drawString(0.75 * inch, y - 1.62 * inch, "Trusted by 27+ teams · 5.0 average rating · 97% client retention")

footer()
c.showPage()

c.save()
print("wrote", OUT)
