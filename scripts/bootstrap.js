// create package.json and README for packages that don't have one yet

const fs = require('fs');
const path = require('path');
const baseVersion = require('../lerna.json').version;

const packagesDir = path.resolve(__dirname, '../packages/');
const files = fs.readdirSync(packagesDir);

files.forEach(pkg => {
  if (pkg.charAt(0) === '.') return;

  const pkgPath = path.join(packagesDir, pkg, `package.json`);
  if (!fs.existsSync(pkgPath)) {
    const json = {
      name: `@deepjs/${pkg}`,
      version: baseVersion,
      description: 'learn-webpack',
      miniprogram: './',
      main: './index.js',
      publishConfig: {
        access: 'public',
      },
      keywords: ['component', 'deepjs'],
      scripts: {},
      author: '@deepjs',
      license: 'MIT',
      jest: {},
      dependencies: {},
    };
    fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2));
  }

  const readmePath = path.join(packagesDir, pkg, `README.md`);
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, `# @deepjs/${pkg}\n\n> ${desc}`);
  }

  const npmIgnorePath = path.join(packagesDir, pkg, `.npmignore`);
  if (!fs.existsSync(npmIgnorePath)) {
    fs.writeFileSync(npmIgnorePath, `__test__\n__mocks__`);
  }
});
