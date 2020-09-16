import { writeFile } from 'fs';

export function writeFileFromBase64(path: string, data: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    writeFile(path, data, 'base64', (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
}
