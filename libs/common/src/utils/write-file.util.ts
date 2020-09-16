import * as fs from 'fs';

export function writeFile(
  filename: string,
  content: string | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | DataView | Float32Array | Float64Array,
): void {
  let filepath = filename.replace(/\\/g, '/');

  let root = '';
  if (filepath[0] === '/') {
    root = '/';
    filepath = filepath.slice(1);
  } else if (filepath[1] === ':') {
    root = filepath.slice(0, 3);
    filepath = filepath.slice(3);
  }

  const folders = filepath.split('/').slice(0, -1);
  folders.reduce((acc, folder) => {
    const folderPath = acc + folder + '/';
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    return folderPath;
  }, root);

  return fs.writeFileSync(root + filepath, content, 'utf-8');
}
