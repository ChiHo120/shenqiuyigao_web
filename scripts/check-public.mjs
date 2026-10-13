import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
const root = process.cwd()
const ignored = new Set(['node_modules', '.git', 'dist', '.wrangler'])
const errors = []
const patterns = [
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['GitHub token', /(?:gh[pousr]_|github_pat_)[A-Za-z0-9_]{20,}/],
  ['Supabase secret', /sb_secret_[A-Za-z0-9_-]{15,}/],
  ['hardcoded password', /(?:ADMIN_PASSWORD|password)\s*(?:===|=|:)\s*['"][^'"]+['"]/],
  ['production Supabase URL', /https:\/\/[a-z0-9]{20}\.supabase\.co/],
  ['site verification', /baidu-site-verification|msvalidate\.01/],
]
async function walk(dir) {
 for (const ent of await readdir(dir, { withFileTypes: true })) {
  if (ignored.has(ent.name)) continue
  const p = path.join(dir, ent.name); const rel = path.relative(root,p)
  if (ent.isDirectory()) { await walk(p); continue }
  if ((ent.name === '.env' || ent.name.startsWith('.env.')) && ent.name !== '.env.example') errors.push(rel + ': local environment file')
  if (/\.(pem|key|p12|pfx|dump|bak|zip|mp4|jpe?g|png|webp)$/i.test(ent.name)) errors.push(rel + ': review binary or private asset before release')
  if (rel === path.join('scripts','check-public.mjs')) continue
  if (!/\.(tsx?|js|mjs|json|jsonc|html|md|sql|yml|yaml|xml|txt|svg)$/.test(ent.name) && !ent.name.startsWith('.env')) continue
  const text = await readFile(p,'utf8')
  for (const [name,regex] of patterns) if (regex.test(text)) errors.push(rel + ': ' + name)
  if (/\.(tsx?|html)$/.test(ent.name)) {
    for (const match of text.matchAll(/['"](\/[^'"?#]+\.(?:svg|png|jpg|webp))['"]/g)) {
      try { await readFile(path.join(root,'public',match[1])) } catch { errors.push(rel + ': missing local asset ' + match[1]) }
    }
  }
 }
}
await walk(root)
if (errors.length) { console.error(errors.join('\n')); process.exitCode=1 }
else console.log('Public-source checks passed. This is a heuristic check, not a complete security audit.')
