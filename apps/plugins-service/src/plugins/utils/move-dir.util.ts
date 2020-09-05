import { rename } from 'fs';

export function moveDir(from: string, to: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    rename(from, to, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
}
