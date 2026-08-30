import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const css = await readFile(join(root.pathname, 'site.css'), 'utf8');

function hexToRgb(value) {
  const hex = value.replace('#', '');
  const expanded = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
  assert.match(expanded, /^[0-9a-f]{6}$/i, `invalid colour ${value}`);
  return [0, 2, 4].map((offset) => parseInt(expanded.slice(offset, offset + 2), 16) / 255);
}

function luminance(rgb) {
  return rgb.reduce((sum, channel, index) => {
    const linear = channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    return sum + linear * [0.2126, 0.7152, 0.0722][index];
  }, 0);
}

function contrast(foreground, background) {
  const a = luminance(hexToRgb(foreground));
  const b = luminance(hexToRgb(background));
  const [light, dark] = a > b ? [a, b] : [b, a];
  return (light + 0.05) / (dark + 0.05);
}

const requiredPairs = [
  ['--ink on --bg', '#171714', '#f5f2eb', 4.5],
  ['--muted on --bg', '#68665f', '#f5f2eb', 4.5],
  ['band ink on band background', '#f8f6f0', '#171714', 4.5],
  ['band muted on band background', '#dcd8cf', '#171714', 4.5],
  ['accent on bg', '#244b3a', '#f5f2eb', 4.5],
  ['accent-2 on band', '#d8a84e', '#171714', 3.0],
];

for (const [label, foreground, background, minimum] of requiredPairs) {
  const ratio = contrast(foreground, background);
  assert.ok(ratio >= minimum, `${label}: ${ratio.toFixed(2)}:1 < ${minimum}:1`);
}

assert.match(css, /--band-ink:#f8f6f0/);
assert.match(css, /--band-muted:#dcd8cf/);
assert.match(css, /\.band \.callout h3\{color:var\(--band-ink\)\}/);

console.log(`✓ required semantic colour pairs meet WCAG AA thresholds`);
