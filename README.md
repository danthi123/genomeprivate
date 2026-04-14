# genomeprivate.com

Six-question dossier quiz that classifies a visitor's genetic-data exposure against PrivDNA's four customer personas (Privacy Hawk, Health Optimizer, Informed Parent, Tech Executive) plus an "Exposed" terminal state. Top-of-funnel asset for [privdna.com](https://privdna.com).

- **Stack:** Next.js 14 (App Router, standalone output), TypeScript, Tailwind.
- **State:** entirely client-side. No database, no analytics beacons, no cookies, no email capture.
- **Image size:** ~180 MB on `node:20-alpine` (no native deps).
- **Fonts:** Instrument Serif + IBM Plex Mono, self-hosted via `next/font/google` (no external font requests at runtime).

## Local development

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build and run in Docker (local test)

```bash
docker compose build
docker compose up -d
curl http://localhost:3000/api/health
```

Override the host port:

```bash
HOST_PORT=3456 docker compose up -d
```

Tear down:

```bash
docker compose down
```

## Deploy on Unraid

1. Copy the project directory to your Unraid box (e.g. `/mnt/user/appdata/compose/genomeprivate/`).
2. Install the **Compose Manager** plugin if not already present.
3. Add a new stack pointing at the directory; Compose Manager reads `docker-compose.yml`.
4. Start the stack.

### Fronting with the existing Cloudflare Tunnel

The `cloudflared` container already running on this host proxies privdna.com et al. To add `genomeprivate.com`:

1. `docker network create shared-network` (once per host, if not already created).
2. In `docker-compose.yml`, uncomment the two `shared` references (under the service and under `networks:`).
3. Make sure the existing `cloudflared` container is on `shared-network` as well.
4. `docker compose up -d`.
5. In the Cloudflare Zero Trust dashboard, add a public hostname route:
   - `genomeprivate.com` → `http://genomeprivate:3000`
   - `www.genomeprivate.com` → same target

Do **not** publish port 3000 to the host in that configuration — delete the `ports:` block so only Cloudflare can reach the service.

## Health check

`GET /api/health` returns `{ status: "ok", service: "genomeprivate", ts: <epoch_ms> }`. The Docker `HEALTHCHECK` hits this every 30s via `wget`.

## Content edits

- Questions and persona weights: `lib/questions.ts`
- Result copy per persona: `lib/scoring.ts` (the `RESULTS` map)
- Aesthetic tokens (colors, fonts, animations): `app/globals.css` + `tailwind.config.ts`

## Analytics

[Rybbit](https://github.com/rybbit-io/rybbit) — self-hosted, cookieless, no PII. Wired in `app/layout.tsx` behind the `RYBBIT_SITE_ID` env var; if that var is blank at build time the tracker snippet is omitted entirely.

Backend is shared with privdna.com (separate `site_id`) so you can see genomeprivate → privdna.com click-through in one dashboard. Outbound link clicks to privdna.com are captured automatically by Rybbit's default event model; no custom events are fired for quiz answers or persona results (deliberately — would undermine the privacy claim).

Footer text was updated from "No analytics tracking you" to "Rybbit analytics — cookieless, no PII" to stay accurate.

## Routes

- `/` — the quiz (intro → 6 questions → persona result)
- `/api/health` — liveness probe, returns JSON

## File tree

```
genomeprivate/
\u251c\u2500\u2500 Dockerfile
\u251c\u2500\u2500 docker-compose.yml
\u251c\u2500\u2500 next.config.mjs
\u251c\u2500\u2500 tailwind.config.ts
\u251c\u2500\u2500 app/
\u2502   \u251c\u2500\u2500 layout.tsx
\u2502   \u251c\u2500\u2500 page.tsx
\u2502   \u251c\u2500\u2500 globals.css
\u2502   \u2514\u2500\u2500 api/health/route.ts
\u251c\u2500\u2500 components/
\u2502   \u2514\u2500\u2500 Quiz.tsx
\u2514\u2500\u2500 lib/
    \u251c\u2500\u2500 questions.ts
    \u2514\u2500\u2500 scoring.ts
```
