import { readFile } from 'fs';

export function parsePackageJson(pathToFile: string): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    readFile(pathToFile, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data.toString()));
    });
  });
}
