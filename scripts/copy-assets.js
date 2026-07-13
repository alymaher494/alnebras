const fs = require('fs');
const path = require('path');

function copyFolderRecursiveSync(source, target) {
  let files = [];

  // Check if folder needs to be created or integrated
  const targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        fs.copyFileSync(curSource, path.join(targetFolder, file));
      }
    });
  }
}

try {
  // Standalone target paths
  const standalonePath = path.join(__dirname, '..', '.next', 'standalone');
  
  if (fs.existsSync(standalonePath)) {
    console.log('Copying static assets for standalone build...');
    
    // Copy .next/static -> .next/standalone/.next/static
    const staticSrc = path.join(__dirname, '..', '.next', 'static');
    const staticDst = path.join(standalonePath, '.next');
    copyFolderRecursiveSync(staticSrc, staticDst);
    
    // Copy public -> .next/standalone/public
    const publicSrc = path.join(__dirname, '..', 'public');
    copyFolderRecursiveSync(publicSrc, standalonePath);
    
    console.log('Static assets copied successfully.');
  } else {
    console.log('.next/standalone folder not found. Skipping asset copy.');
  }
} catch (err) {
  console.error('Error copying static assets:', err);
  process.exit(1);
}
