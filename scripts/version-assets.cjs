// Run before publishing: node scripts/version-assets.cjs
// Every execution generates fresh publication versions, independent of content.
// --force remains accepted for compatibility.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const original = fs.readFileSync(htmlPath, 'utf8');
let html = original;
const release = crypto.randomBytes(8).toString('hex');
for (const name of ['styles.css', 'accessibility.css', 'app.js']) {
  fs.accessSync(path.join(root, name));
  const hash = crypto.randomBytes(6).toString('hex');
  const escaped = name.replace(/\./g, '\\.');
  const reference = new RegExp(`((?:href|src)="${escaped})(?:\\?[^"\\s]*)?"`, 'g');
  let matches = 0;
  let version;
  html = html.replace(reference, (match, prefix) => {
    matches++;
    version = `${hash}-${release}`;
    return `${prefix}?v=${version}"`;
  });
  if (matches !== 1) throw new Error(`Esperada uma referencia a ${name}; encontradas ${matches}.`);
  console.log(`${name}?v=${version}`);
}
if (html !== original) fs.writeFileSync(htmlPath, html);
