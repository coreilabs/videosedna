// Run before publishing: node scripts/version-assets.cjs
// Stable content hashes change the URL only when the file itself changes.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const original = fs.readFileSync(htmlPath, 'utf8');
let html = original;
for (const name of ['styles.css', 'accessibility.css', 'app.js']) {
  const version = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, name))).digest('hex').slice(0, 12);
  const escaped = name.replace(/\./g, '\\.');
  const reference = new RegExp(`((?:href|src)="${escaped})(?:\\?[^"\\s]*)?"`, 'g');
  let matches = 0;
  html = html.replace(reference, (_, prefix) => { matches++; return `${prefix}?v=${version}"`; });
  if (matches !== 1) throw new Error(`Esperada uma referencia a ${name}; encontradas ${matches}.`);
  console.log(`${name}?v=${version}`);
}
if (html !== original) fs.writeFileSync(htmlPath, html);
