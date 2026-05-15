#!/bin/bash

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     AUDIT COMPLETO - RICERCA DI TUTTI I BUG POSSIBILI      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# 1. RICERCA ERRORI COMUNI
echo "=== 1. ERRORI JAVASCRIPT COMUNI ==="
echo ""
echo "A) Possibili undefined references:"
grep -n "window\.\|document\." *.html | grep -v "getElementById\|addEventListener\|querySelector" | wc -l
echo "   window/document calls trovati"
echo ""

echo "B) Split senza validazione:"
grep -n "\.split(" *.html | grep -v "split(' - ')" | wc -l
echo "   split() calls trovati"
echo ""

echo "C) Array access senza protezione:"
grep -n "\[\s*[0-9]\s*\]\|\[.*\]\[" *.html | wc -l
echo "   array access patterns"
echo ""

echo "D) Funzioni onclick non validate:"
grep -n "onclick=" *.html | wc -l
echo "   onclick handlers"
echo ""

# 2. VERIFICHE FORM
echo ""
echo "=== 2. FORM VALIDATION ISSUES ==="
for file in *.html; do
    echo "📄 $file:"
    grep -c "<input\|<textarea\|<select" "$file" || echo "   Nessun form field"
done
echo ""

# 3. VERIFICHE LINK
echo "=== 3. LINK VALIDATION ==="
echo "A) Link href (devono essere validi):"
grep -o 'href="[^"]*"' *.html | grep -v "http\|mailto\|tel\|javascript\|#" | sort | uniq
echo ""

# 4. ERRORI COMUNI
echo "=== 4. PATTERN PERICOLOSI ==="
echo "A) parseInt senza radix:"
grep -n "parseInt(" *.html | grep -v ", 10\|, 16\|trim()" | wc -l
echo ""

echo "B) Array.map su risultato split:"
grep -n "\.split.*\.map\|\.map.*split" *.html | wc -l
echo ""

echo "C) Ternary operators annidati (hard to debug):"
grep -n "? .* ? " *.html | wc -l
echo ""

