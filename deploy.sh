#!/usr/bin/env bash
set -e
cd my-app
npm run build
cd ..
rm -rf docs
mv my-app/build docs
