#!/usr/bin/env node

const path = require('path');
const { execSync } = require('child_process');
const degit = require('degit');

const targetDir = 'my-dashboard'; //This will create a folder named my-dashboard in the current directory
const repo = 'https://github.com/ivie-gif/dashboard-boilerplate.git'; // Replace with your GitHub repo

(async () => {
  try {
    console.log('📦 Cloning dashboard boilerplate from GitHub...');

    const emitter = degit(repo, {
      cache: false,
      force: true,
      verbose: true
    });

    await emitter.clone(targetDir);

    console.log('\n✅ Dashboard created in:', targetDir);
    console.log('👉 Next steps:');
    console.log(`   cd ${targetDir}`);
    console.log('   npm install');
    console.log('   npm run dev');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();


