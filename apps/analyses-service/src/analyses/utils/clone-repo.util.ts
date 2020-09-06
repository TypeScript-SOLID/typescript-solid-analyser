import { Logger } from '@nestjs/common';
import { exec } from 'child_process';

export function cloneRepo(url: string, cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`git clone ${url} .`, { cwd }, (err, stdout, stderr) => {
      Logger.log(stdout);
      if (err) {
        Logger.error(stderr);
        reject(err);
        return;
      }
      resolve();
    });
  });
}
