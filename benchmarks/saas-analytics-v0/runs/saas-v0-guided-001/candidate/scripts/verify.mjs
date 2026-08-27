const states = ['/', '/?state=loading', '/?state=empty', '/?state=partial', '/?state=error'];
const requiredFiles = ['index.html', 'src/main.js', 'src/styles.css', 'fixtures/analytics.json'];

for (const file of requiredFiles) {
  const stat = await import('node:fs/promises').then((fs) => fs.stat(file));
  if (!stat.isFile()) throw new Error(`${file} is missing`);
}

console.log('Required state URLs:');
for (const state of states) console.log(`  ${state}`);
console.log('Automated accessibility scan: not run; axe/playwright are not installed in the isolated bundle.');
