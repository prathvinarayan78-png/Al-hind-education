#!/usr/bin/env python3
"""Static-site sanity check: tag balance + every local href/src resolves on disk."""
import os
import re
import sys
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr"}

class Checker(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.errors = []
        self.refs = []

    def handle_starttag(self, tag, attrs):
        if tag not in VOID:
            self.stack.append((tag, self.getpos()))
        for k, v in attrs:
            if k in ("href", "src") and v:
                self.refs.append(v)

    def handle_startendtag(self, tag, attrs):
        for k, v in attrs:
            if k in ("href", "src") and v:
                self.refs.append(v)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack:
            self.errors.append(f"stray </{tag}> at {self.getpos()}")
            return
        open_tag, pos = self.stack.pop()
        if open_tag != tag:
            self.errors.append(f"mismatch: <{open_tag}> opened {pos}, closed by </{tag}> at {self.getpos()}")

def main():
    pages = [p for p in os.listdir(ROOT) if p.endswith(".html")]
    bad = 0
    all_refs = set()
    for page in sorted(pages):
        path = os.path.join(ROOT, page)
        c = Checker()
        with open(path, encoding="utf-8") as fh:
            c.feed(fh.read())
        for tag, pos in c.stack:
            c.errors.append(f"unclosed <{tag}> opened at {pos}")
        if c.errors:
            bad += 1
            print(f"FAIL {page}")
            for e in c.errors:
                print("   -", e)
        else:
            print(f"ok   {page} (tags balanced)")
        for r in c.refs:
            all_refs.add((page, r))

    missing = []
    for page, ref in sorted(all_refs):
        if ref.startswith(("http", "mailto:", "tel:", "#")):
            continue
        target = ref.split("#")[0].split("?")[0]
        if not target:
            continue
        if not os.path.exists(os.path.join(ROOT, target)):
            missing.append((page, ref))
    if missing:
        bad += 1
        print("FAIL missing local files:")
        for page, ref in missing:
            print(f"   - {page} -> {ref}")
    else:
        print("ok   all local href/src targets exist on disk")

    sys.exit(1 if bad else 0)

if __name__ == "__main__":
    main()
