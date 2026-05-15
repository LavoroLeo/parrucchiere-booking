#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║    AUDIT ULTRA-APPROFONDITO - RICERCA DI OGNI BUG        ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# 1. CONTROLLARE OGNI VARIABILE NON INIZIALIZZATA
echo "=== 1. VARIABILI NON INIZIALIZZATE ==="
echo "Variabili usate senza dichiarazione (let/const/var):"
grep -n "= [^=]" *.html | grep -v "let\|const\|var\|this\." | grep -v "document\|window\|localStorage\|JSON" | head -5
echo ""

# 2. CONTROLLARE CONDIZIONI IMPOSSIBILI
echo "=== 2. LOGICA SOSPETTA ==="
echo "if (!x && x) o simili:"
grep -n "if.*&&.*||" *.html | wc -l
echo ""

# 3. CONTROLLARE RETURN STATEMENTS MANCANTI
echo "=== 3. EARLY RETURNS MANCANTI ==="
echo "Funzioni con multiple paths senza return:"
grep -n "function.*{" *.html | wc -l
echo "funzioni trovate"
echo ""

# 4. CONTROLLARE STRING CONCATENATION BUGS
echo "=== 4. STRING CONCATENATION ISSUES ==="
echo "Template literals con spazi mancanti:"
grep -n '\${' *.html | grep "}\s*+" | wc -l
echo ""

# 5. CONTROLLARE LOOP ISSUES
echo "=== 5. LOOP ISSUES ==="
echo "While true senza break:"
grep -n "while.*true" *.html
echo ""

# 6. CONTROLLARE MOUSE EVENTS
echo "=== 6. EVENT HANDLERS SENZA VALIDATION ==="
echo "onclick senza funzione check:"
grep -n 'onclick="[a-zA-Z_]*"' *.html | wc -l
echo ""

# 7. CONTROLLARE DATA MISMATCH
echo "=== 7. DATA TYPE ISSUES ==="
echo "Conversioni senza typeof check:"
grep -n "toString\|valueOf" *.html | wc -l
echo ""

# 8. CONTROLLARE REGEX ISSUES
echo "=== 8. REGEX PATTERNS ==="
grep -n "\.match\|\.test\|\.replace.*/" *.html | wc -l
echo "regex operations"
echo ""

# 9. CONTROLLARE ASYNC ISSUES
echo "=== 9. RACE CONDITION RISKS ==="
echo "setTimeout/setInterval usage:"
grep -n "setTimeout\|setInterval" *.html | wc -l
echo ""

# 10. CONTROLLARE MEMORY LEAKS
echo "=== 10. POTENTIAL MEMORY LEAKS ==="
echo "Event listeners non rimossi:"
grep -n "addEventListener" *.html | grep -v "removeEventListener" | wc -l
echo "listeners senza cleanup"
echo ""

# 11. CONTROLLARE FORMA DI BOOLEAN
echo "=== 11. BOOLEAN LOGIC ISSUES ==="
echo "Truthy/falsy bugs:"
grep -n "if (x)" *.html | wc -l
echo "implicit boolean checks"
echo ""

# 12. CONTROLLARE NULL vs UNDEFINED
echo "=== 12. NULL vs UNDEFINED ==="
echo "Checks per null ma non undefined (o viceversa):"
grep -n "=== null\|!== null" *.html | wc -l
echo ""

