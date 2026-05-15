#!/bin/bash

echo "=== RICERCA BUG JAVASCRIPT ==="
echo ""

# BUG: document.getElementById senza null check
echo "1. getElementById senza null check:"
grep -n "getElementById.*\." *.html | grep -v "if\|const\|let" | head -5

echo ""
echo "2. JSON.parse senza try-catch:"
grep -n "JSON.parse" *.html | grep -v "try\|catch" | head -5

echo ""
echo "3. Funzioni onclick senza return false:"
grep -n "onclick=" *.html | grep -v "return false" | head -5

echo ""
echo "4. localStorage senza null check:"
grep -n "localStorage.getItem" *.html | grep -v "||" | grep -v "??" | head -5

echo ""
echo "5. Array/Object accesso senza verifica:"
grep -n "\[0\]\|\[1\]" *.html | grep -v "if\|length" | head -5

echo ""
echo "6. Date manipulation issues:"
grep -n "new Date" *.html | grep -c "new Date"
echo "Date objects found"

