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

# ---- ENSURE CUSTOM DOMAIN ----
echo "➡️  Writing CNAME..."
echo "hillaryesposito.org" > "$DOCS_DIR/CNAME"


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
git push

echo "✅ Deploy complete!"
echo "🌐 If GitHub Pages is set to main /docs, your site will update shortly."


# deploy: chmod +x deploy.sh (second line:) ./deploy.sh "Update site"