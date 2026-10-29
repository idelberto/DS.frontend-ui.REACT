#!/usr/bin/env bash
# Instala todos os itens do registry num app Next limpo, como faz um projeto consumidor, e builda.
# Precisa do npm run build antes: o registry é servido do out/, no mesmo caminho do Pages.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SHADCN="shadcn@4.23.0"
PORT=3202
SERVER_STARTUP_ATTEMPTS=30
BASE_PATH="$(node --input-type=module -e "import { BASE_PATH } from '$ROOT_DIR/src/lib/base-path.ts'; console.log(BASE_PATH);")"
WORK_DIR="$(mktemp -d)"

PORT="$PORT" node "$ROOT_DIR/scripts/serve-static.ts" &
SERVER_PID=$!
trap 'kill "$SERVER_PID"; rm -rf "$WORK_DIR"' EXIT

for _ in $(seq "$SERVER_STARTUP_ATTEMPTS"); do
  curl --silent --fail "http://localhost:$PORT$BASE_PATH/r/registry.json" > /dev/null && break
  sleep 1
done

cd "$WORK_DIR"
npx --yes "$SHADCN" init -t next -b base -p nova -n consumer --no-monorepo --yes
cd consumer

REGISTRY_URL="http://localhost:$PORT$BASE_PATH/r/{name}.json" node -e "
const fs = require('node:fs');
const config = JSON.parse(fs.readFileSync('components.json', 'utf8'));
config.registries = { '@frontend-ui': process.env.REGISTRY_URL };
fs.writeFileSync('components.json', JSON.stringify(config, null, 2));
"

ITEMS="$(node -e "
console.log(require('$ROOT_DIR/registry.json').items.map((item) => '@frontend-ui/' + item.name).join(' '));
")"
# shellcheck disable=SC2086 # um argumento por item
npx "$SHADCN" add $ITEMS --yes --overwrite

npx tsc --noEmit
npm run build
