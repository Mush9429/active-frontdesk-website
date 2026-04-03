import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
process.chdir(__dirname);

const port = process.env.PORT || 3000;
execSync(`node node_modules/next/dist/bin/next dev --port ${port}`, {
  cwd: __dirname,
  stdio: 'inherit',
  env: { ...process.env, PATH: '/usr/local/bin:/usr/bin:/bin:' + (process.env.PATH || '') }
});
