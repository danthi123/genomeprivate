import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import fs from 'node:fs';
import path from 'node:path';

const src = 'public/favicon.svg';
const pub = 'public';
const appDir = 'app';

async function render(size, outPath) {
  await sharp(src, { density: 512 })
    .resize(size, size, { fit: 'contain', background: { r: 241, g: 240, b: 229, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  const stat = fs.statSync(outPath);
  console.log('  wrote', outPath, stat.size, 'bytes');
}

console.log('PNG renders:');
await render(16, path.join(pub, 'icon-16.png'));
await render(32, path.join(pub, 'icon-32.png'));
await render(48, path.join(pub, 'icon-48.png'));
await render(180, path.join(pub, 'apple-touch-icon.png'));
await render(192, path.join(pub, 'icon-192.png'));
await render(512, path.join(pub, 'icon-512.png'));

console.log('favicon.ico:');
const buf = await pngToIco([
  path.join(pub, 'icon-16.png'),
  path.join(pub, 'icon-32.png'),
  path.join(pub, 'icon-48.png'),
]);
fs.writeFileSync(path.join(appDir, 'favicon.ico'), buf);
fs.writeFileSync(path.join(pub, 'favicon.ico'), buf);
console.log('  wrote', path.join(appDir, 'favicon.ico'), buf.length, 'bytes');

// intermediate sizes only needed for .ico build
fs.unlinkSync(path.join(pub, 'icon-16.png'));
fs.unlinkSync(path.join(pub, 'icon-32.png'));
fs.unlinkSync(path.join(pub, 'icon-48.png'));
