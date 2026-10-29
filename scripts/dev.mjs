import { spawnSync } from 'node:child_process';
const prepared = spawnSync(process.execPath, ['scripts/prepare-preview.mjs'], { stdio: 'inherit' });
if (prepared.status !== 0) process.exit(prepared.status || 1);
const compiled = spawnSync(process.execPath, ['scripts/build.mjs', '--dev'], { stdio: 'inherit' });
if (compiled.status !== 0) process.exit(compiled.status || 1);
await import('./serve.mjs');
