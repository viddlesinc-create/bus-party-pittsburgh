#!/usr/bin/env bash
# validate-routes.sh — every sitemap <loc> must be servable, or the build/deploy fails.
#
# Two modes:
#   ./scripts/validate-routes.sh --dist
#       Build gate (runs inside the Netlify build, before publish): verifies a
#       prerendered HTML file exists in dist/ for every sitemap URL, and that
#       it contains real page content (a <h1> and a non-empty <title>), not an
#       SPA shell or Suspense fallback.
#
#   ./scripts/validate-routes.sh https://pittpartybus.com
#       Post-deploy gate: curls every sitemap URL against the given origin and
#       requires HTTP 200. Also probes a garbage path, which must return 404 —
#       a 200 there means a /* -> /index.html catch-all is serving the SPA
#       shell on every path (forbidden: it hides missing pages from us while
#       feeding crawlers empty shells).
#
# Exits non-zero on any failure.

set -euo pipefail

cd "$(dirname "$0")/.."

SITEMAP="public/sitemap.xml"
MODE="${1:-}"

if [[ -z "$MODE" ]]; then
  echo "Usage: $0 --dist | <base-url>" >&2
  exit 2
fi

# Extract paths from sitemap <loc> entries
PATHS=$(grep -o '<loc>[^<]*</loc>' "$SITEMAP" | sed -E -e 's/<[^>]*>//g' -e 's|https?://[^/]*||' -e 's|^$|/|')
if [[ -z "$PATHS" ]]; then
  echo "FAIL: no <loc> entries found in $SITEMAP" >&2
  exit 1
fi

FAILURES=0
printf "%-55s %s\n" "ROUTE" "STATUS"
printf "%-55s %s\n" "-----" "------"

if [[ "$MODE" == "--dist" ]]; then
  for p in $PATHS; do
    [[ "$p" == "" ]] && p="/"
    if [[ "$p" == "/" ]]; then
      f="dist/index.html"
    else
      f="dist${p}.html"
    fi
    if [[ ! -f "$f" ]]; then
      printf "%-55s %s\n" "$p" "MISSING ($f)"
      FAILURES=$((FAILURES+1))
    elif ! grep -q "<h1" "$f" || ! grep -qE "<title[^>]*>[^<]+</title>" "$f"; then
      printf "%-55s %s\n" "$p" "SHELL (no h1/title in $f)"
      FAILURES=$((FAILURES+1))
    else
      printf "%-55s %s\n" "$p" "OK"
    fi
  done
  # 404 page must exist so unknown paths get a styled 404, never the SPA shell
  if [[ ! -f "dist/404.html" ]]; then
    printf "%-55s %s\n" "/404.html" "MISSING"
    FAILURES=$((FAILURES+1))
  else
    printf "%-55s %s\n" "/404.html" "OK"
  fi
else
  BASE="${MODE%/}"
  for p in $PATHS; do
    [[ "$p" == "" ]] && p="/"
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "${BASE}${p}")
    if [[ "$code" == "200" ]]; then
      printf "%-55s %s\n" "$p" "200"
    else
      printf "%-55s %s\n" "$p" "$code  <-- FAIL"
      FAILURES=$((FAILURES+1))
    fi
  done
  # Catch-all detector: a nonexistent path must 404
  probe="/this-route-must-not-exist-validate-probe"
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "${BASE}${probe}")
  if [[ "$code" == "404" ]]; then
    printf "%-55s %s\n" "$probe" "404 (correct)"
  else
    printf "%-55s %s\n" "$probe" "$code  <-- FAIL: catch-all detected, must be 404"
    FAILURES=$((FAILURES+1))
  fi
fi

echo
if [[ "$FAILURES" -gt 0 ]]; then
  echo "❌ validate-routes: $FAILURES failure(s)"
  exit 1
fi
echo "✅ validate-routes: all routes OK"
