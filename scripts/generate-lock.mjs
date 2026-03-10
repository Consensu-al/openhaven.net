import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

const projectDir = '/vercel/share/v0-project';

console.log('[v0] Working directory:', projectDir);
console.log('[v0] Checking for existing lock files...');

const lockFiles = ['package-lock.json', 'bun.lock', 'yarn.lock', 'pnpm-lock.yaml'];
for (const lf of lockFiles) {
  const full = path.join(projectDir, lf);
  console.log(`[v0] ${lf}: ${existsSync(full) ? 'EXISTS' : 'missing'}`);
}

console.log('[v0] Running npm install to generate package-lock.json...');
try {
  const result = execSync('npm install --package-lock-only', {
    cwd: projectDir,
    encoding: 'utf8',
    stdio: 'pipe',
  });
  console.log('[v0] npm install output:', result);
} catch (err) {
  console.log('[v0] npm install stderr:', err.stderr);
  console.log('[v0] npm install stdout:', err.stdout);
  console.log('[v0] npm install status:', err.status);
}

for (const lf of lockFiles) {
  const full = path.join(projectDir, lf);
  console.log(`[v0] After install — ${lf}: ${existsSync(full) ? 'EXISTS' : 'missing'}`);
}
