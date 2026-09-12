#!/usr/bin/env python3
"""Generate clearly-labelled placeholder PDFs under assets/docs/ so no link 404s
before the society drops in its real documents."""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, "assets", "docs")

FILES = {
    "annual-report-2024-25.pdf": ["AL HIND EDUCATIONS & DEVELOPMENTS SOCIETY", "Annual Report 2024-25 - PLACEHOLDER", "Replace this file with the real annual report.", "See README.md, 'Before publishing'."],
    "audited-accounts-2024-25.pdf": ["AL HIND EDUCATIONS & DEVELOPMENTS SOCIETY", "Audited Accounts 2024-25 - PLACEHOLDER", "Replace this file with the CA-audited statements.", "See README.md, 'Before publishing'."],
    "memorandum-of-society.pdf": ["AL HIND EDUCATIONS & DEVELOPMENTS SOCIETY", "Memorandum & Rules - PLACEHOLDER", "Replace this file with the registered memorandum.", "See README.md, 'Before publishing'."],
    "80g-certificate.pdf": ["AL HIND EDUCATIONS & DEVELOPMENTS SOCIETY", "80G Certificate - PLACEHOLDER", "Replace this file with the current certificate.", "See README.md, 'Before publishing'."],
    "annual-report-2023-24.pdf": ["AL HIND EDUCATIONS & DEVELOPMENTS SOCIETY", "Annual Report 2023-24 - PLACEHOLDER", "Replace this file with the real annual report.", "See README.md, 'Before publishing'."],
}

def esc(s):
    return s.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)")

def make_pdf(lines):
    content = "BT /F1 14 Tf 72 720 Td 22 TL\n"
    for i, line in enumerate(lines):
        size = 14 if i == 0 else 11
        content += f"/F1 {size} Tf ({esc(line)}) Tj T*\n"
    content += "ET"
    objs = []
    objs.append("<< /Type /Catalog /Pages 2 0 R >>")
    objs.append("<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    objs.append("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>")
    objs.append(f"<< /Length {len(content)} >>\nstream\n{content}\nendstream")
    objs.append("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    out = "%PDF-1.4\n"
    offsets = []
    for i, obj in enumerate(objs, 1):
        offsets.append(len(out.encode()))
        out += f"{i} 0 obj\n{obj}\nendobj\n"
    xref_at = len(out.encode())
    out += f"xref\n0 {len(objs)+1}\n0000000000 65535 f \n"
    for off in offsets:
        out += f"{off:010d} 00000 n \n"
    out += f"trailer\n<< /Size {len(objs)+1} /Root 1 0 R >>\nstartxref\n{xref_at}\n%%EOF\n"
    return out

os.makedirs(DOCS, exist_ok=True)
for name, lines in FILES.items():
    with open(os.path.join(DOCS, name), "w", encoding="latin-1") as fh:
        fh.write(make_pdf(lines))
    print("wrote", name)
