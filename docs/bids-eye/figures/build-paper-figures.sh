#!/usr/bin/env bash
# Builds the three figures of the BIDS-Eye project page from their TikZ sources
# and writes PNGs to public/images/projects/. Needs pdflatex and pdftoppm.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="$here/../../../public/images/projects"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
for name in pipeline tiers results; do
  pdflatex -interaction=nonstopmode -halt-on-error -output-directory "$tmp" "$here/paper-$name.tex" >"$tmp/$name.log" \
    || { tail -n 30 "$tmp/$name.log"; exit 1; }
  pdftoppm -png -r 330 -singlefile "$tmp/paper-$name.pdf" "$out/bids-eye-$name"
  echo "wrote $out/bids-eye-$name.png"
done
