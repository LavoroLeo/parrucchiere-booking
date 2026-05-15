#!/bin/bash

echo "=== RICERCA AVANZATA BUG ==="
echo ""

# 1. Controllo NaN
echo "1. Possibili NaN issues (parseFloat/parseInt senza controllo):"
grep -n "parseFloat\|parseInt" *.html | grep -v ", 10\|isNaN\|!isNaN" | head -3
echo ""

# 2. Controllo empty string
echo "2. Value.trim() senza verifica lunghezza:"
grep -n "\.trim()" *.html | grep -v "if\|length\|===\|!==" | wc -l
echo ""

# 3. Controllo date
echo "3. Date parsing (toLocaleDateString):"
grep -n "toLocaleDateString" *.html | wc -l
echo "   istanze trovate"
echo ""

# 4. Controllo localStorage length loop
echo "4. Loop localStorage.length (problema: length cambia durante loop):"
grep -n "for.*localStorage.length" *.html | wc -l
echo ""

# 5. Controllo array forEach su array che può essere undefined
echo "5. forEach su array potenzialmente undefined:"
grep -n "\.forEach(" *.html | grep -v "||" | grep -v "const\|let" | wc -l
echo ""

# 6. Controllo onclick con preventDefault
echo "6. Form onsubmit senza preventDefault:"
grep -n "onsubmit=" *.html | grep -v "preventDefault" | wc -l
echo ""

# 7. Controllo async/await
echo "7. Async operations (nessuno = no race conditions):"
grep -n "async\|await\|Promise" *.html | wc -l
echo ""

# 8. Controllo regex
echo "8. Regex usage (potenzialmente problematiche):"
grep -n "/.*/" *.html | grep -v "\/\/" | wc -l
echo ""

# 9. Controllo template literals
echo "9. Template literals con variabili non validate:"
grep -n "\${" *.html | wc -l
echo "   template literals trovati"
echo ""

# 10. Controllo console.log in produzione
echo "10. Console.log/error statements:"
grep -n "console\.log\|console\.error" *.html | wc -l
echo "    trovati (OK se per debugging)"

