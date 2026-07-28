#!/usr/bin/env bash
set -euo pipefail

# ---- CONFIG ----
APP_DIR="my-app"
DOCS_DIR="docs"
BUILD_DIR="$APP_DIR/build"
ASSETS_DIR="$APP_DIR/public/assets"

# ---- SAFETY CHECKS ----
if [ ! -f "$APP_DIR/package.json" ]; then
  echo "❌ Cannot find $APP_DIR/package.json. Check APP_DIR in deploy.sh."
  exit 1
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
  echo "❌ On branch '$BRANCH'. GitHub Pages builds main/docs, so this would"
  echo "   commit and push without ever deploying. Switch to main first."
  exit 1
fi

echo "✅ Starting deploy from repo root: $(pwd)"
echo "➡️  Building React app in $APP_DIR..."

# ---- BUILD ----
pushd "$APP_DIR" >/dev/null
npm install
npm run build
popd >/dev/null

# ---- SYNC BUILD -> DOCS ----
echo "➡️  Syncing $BUILD_DIR -> $DOCS_DIR..."

rm -rf "$DOCS_DIR"
mkdir -p "$DOCS_DIR"
cp -R "$BUILD_DIR"/. "$DOCS_DIR"

# ---- OPTIONAL: ensure .nojekyll (CRA sometimes needs it for assets paths) ----
# This prevents GitHub Pages from running Jekyll processing.
touch "$DOCS_DIR/.nojekyll"

# ---- PRERENDER PUBLIC ROUTES ----
# Without this every route but "/" resolves to 404.html: a real HTTP 404 with
# <title>Redirecting...</title>. Humans are fine (the SPA bounce works), but
# crawlers and link scrapers do not run JS, so the sitemap advertised URLs that
# 404 and shared case-study links produced no preview card.
echo "➡️  Prerendering route shells..."
node scripts/prerender-routes.mjs

# ---- ENSURE CUSTOM DOMAIN ----
echo "➡️  Writing CNAME..."
echo "hillaryesposito.org" > "$DOCS_DIR/CNAME"


# ---- VERIFY THE SYNC ----
# The sync is `rm -rf docs` + copy, so a file that stops being produced by the
# build disappears silently. Assert the ones the site cannot work without.
echo "➡️  Verifying published files..."
for f in .nojekyll CNAME 404.html robots.txt sitemap.xml index.html \
         .well-known/security.txt about/index.html case-study/msk/index.html; do
  if [ ! -e "$DOCS_DIR/$f" ]; then
    echo "❌ $f missing from $DOCS_DIR after sync. Aborting before commit."
    exit 1
  fi
done

# ---- GIT STATUS + COMMIT ----
echo "➡️  Staging changes (source + docs)..."
git add "$APP_DIR" "$DOCS_DIR"

# If nothing changed, exit cleanly
if git diff --cached --quiet; then
  echo "✅ No changes to commit. Deploy is already up to date."
  exit 0
fi

# Commit message: allow an optional argument
MSG="${1:-Deploy site}"
echo "➡️  Committing: $MSG"
git commit -m "$MSG"

echo "➡️  Pushing to origin/main..."
git push origin main

echo "✅ Deploy complete!"
echo "🌐 If GitHub Pages is set to main /docs, your site will update shortly."


# deploy: chmod +x deploy.sh (second line:) ./deploy.sh "Update site"