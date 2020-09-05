import rimraf from 'rimraf';

export function cleanup(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    rimraf(path, (err: Error) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
