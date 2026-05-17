# @agrippa-io/node-mongoose

Mongoose framework layer for Agrippa services — connection management, a
declarative `ModelLoader`, base serializers, plugins, and request/use-case
utilities.

## Usage

```ts
import { connect, loadModels } from '@agrippa-io/node-mongoose'
```

`mongoose` and `express` are **peer dependencies** — the consuming service
provides them.

## Conventions

Standard `node-service-template` setup: CommonJS, `strict` type-checking,
`src/*` path aliases (`tsc-alias`), ESLint flat config, Vitest.

## Scripts

```bash
npm run build       # tsc + tsc-alias -> dist/
npm test            # vitest
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
```
