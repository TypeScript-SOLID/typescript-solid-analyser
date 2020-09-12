import * as fs from 'fs';
import { join } from 'path';

export function moveDir(from: string, to: string, name: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
    fs.rename(from, join(to, name), (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
}
