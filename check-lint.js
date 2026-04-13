const { execSync } = require('child_process');
try {
  const output = execSync('npx eslint . --format json', { encoding: 'utf8', maxBuffer: 1024 * 1024 * 10 });
} catch (error) {
  const results = JSON.parse(error.stdout);
  results.filter(r => r.errorCount > 0).forEach(r => {
    console.log('\n--- FILE:', r.filePath);
    r.messages.forEach(m => console.log('Line', m.line, m.column, '-', m.message, '(', m.ruleId, ')'));
  });
}
