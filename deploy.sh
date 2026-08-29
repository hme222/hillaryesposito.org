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

# `docs/designpowers/` contains tracked review records, not publish output.
# Delete stale generated files while preserving that documentation tree.
mkdir -p "$DOCS_DIR"
rsync -a --delete --exclude='designpowers/' "$BUILD_DIR"/ "$DOCS_DIR"/

# ---- OPTIONAL: ensure .nojekyll (CRA sometimes needs it for assets paths) ----
# This prevents GitHub Pages from running Jekyll processing.
touch "$DOCS_DIR/.nojekyll"

# ---- PRERENDER PUBLIC + APPROVED DIRECT-LINK ROUTES ----
# Without this every route but "/" resolves to 404.html: a real HTTP 404 with
# <title>Redirecting...</title>. Humans are fine (the SPA bounce works), but
# crawlers and link scrapers do not run JS, so the sitemap advertised URLs that
# 404 and shared case-study links produced no preview card.
echo "➡️  Prerendering route shells..."
node scripts/prerender-routes.mjs

# Every public route shell must execute the same frozen build as the homepage.
# Route-specific metadata may differ; stale JS/CSS fingerprints block release.
echo "➡️  Verifying route-shell asset parity..."
node scripts/verify-route-shell-parity.mjs

# ---- ENSURE CUSTOM DOMAIN ----
echo "➡️  Writing CNAME..."
echo "hillaryesposito.org" > "$DOCS_DIR/CNAME"


# ---- VERIFY THE SYNC ----
# The sync deletes stale generated output while preserving `docs/designpowers/`.
# Assert the files the published site cannot work without.
echo "➡️  Verifying published files..."
for f in .nojekyll CNAME 404.html robots.txt sitemap.xml index.html \
         .well-known/security.txt about/index.html case-study/msk/index.html \
         curated/healthcare-product-service-designer/index.html; do
  if [ ! -e "$DOCS_DIR/$f" ]; then
    echo "❌ $f missing from $DOCS_DIR after sync. Aborting before commit."
    exit 1
  fi
done

# ---- GIT STATUS + COMMIT ----
echo "➡️  Staging changes (source + docs + release tooling)..."
git add "$APP_DIR" "$DOCS_DIR" deploy.sh scripts

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
