#!/bin/sh
# Run wrangler pages dev with --proxy by temporarily removing
# `pages_build_output_dir` from wrangler.toml (wrangler 4 rejects both at once).
set -e

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

cleanup() {
  if [ -f wrangler.toml.bak ]; then
    mv wrangler.toml.bak wrangler.toml
  fi
}
trap cleanup EXIT INT TERM

# Recover from a previous unclean exit (SIGKILL bypasses our trap).
if [ -f wrangler.toml.bak ]; then
  mv wrangler.toml.bak wrangler.toml
fi

cp wrangler.toml wrangler.toml.bak
grep -v '^pages_build_output_dir' wrangler.toml.bak > wrangler.toml

VITE_PORT=5174 exec npx wrangler pages dev \
  --proxy 5174 \
  --port "${PORT:-8788}" \
  --ip 127.0.0.1 \
  -- npx vite --port 5174
