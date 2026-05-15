#!/bin/bash

echo "=== RICERCA EDGE CASE BUG ==="
echo ""

# 1. Divisione per zero
echo "1. Divisione per zero (/ 0):"
grep -n "/ 0\|/0\|÷ 0" *.html | wc -l
echo ""

# 2. Array access con indice negativo
echo "2. Negative array access (-1):"
grep -n "\[-1\]\|\[.*-.*\]" *.html | wc -l
echo ""

# 3. Substring senza length check
echo "3. Substring/slice senza bounds:"
grep -n "\.substring\|\.slice" *.html | grep -v "if\|length" | wc -l
echo ""

# 4. Modulo per zero
echo "4. Modulo per zero (% 0):"
grep -n "% 0\|%0" *.html | wc -l
echo ""

# 5. Switch senza default
echo "5. Switch without default:"
grep -n "switch.*{" *.html | wc -l
echo "switches (verificare se hanno default)"
echo ""

# 6. Math.random senza controllo range
echo "6. Math.random() usage:"
grep -n "Math.random" *.html | wc -l
echo ""

# 7. Array .pop() su array potentially empty
echo "7. Array operations su array potenzialmente vuoto:"
grep -n "\.pop\|\.shift\|\.unshift" *.html | wc -l
echo ""

# 8. Object key access senza exists check
echo "8. Object key access dangerous:"
grep -n "\[.*\]\[" *.html | wc -l
echo ""

# 9. Spread operator on null/undefined
echo "9. Spread operator usage:"
grep -n "\.\.\." *.html | wc -l
echo ""

# 10. Ternary annidate (hard to debug)
echo "10. Nested ternaries (hard to read):"
grep -n "? .* ? .* :" *.html | wc -l
echo ""

