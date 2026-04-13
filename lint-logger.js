const { execSync } = require('child_process');
try {
  execSync('npx eslint . --format json', { encoding: 'utf8', stdio: 'pipe' });
  console.log('SUCCESS');
} catch (error) {
  try {
    const results = JSON.parse(error.stdout);
    results.filter(r => r.errorCount > 0).forEach(r => {
      console.log('Failing file:', r.filePath);
      r.messages.forEach(m => console.log(' ->', m.message));
    });
  } catch (e) {
    console.log('JSON parse failed', e);
  }
}
