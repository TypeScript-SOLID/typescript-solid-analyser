import { stat } from 'fs';

export function fileExists(pathToFile: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    stat(pathToFile, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
}
