import axios from 'axios';
import * as fs from 'fs';
import { Stream } from 'stream';

export const writeFileFromStream = async (url: string, path: string, token: string): Promise<void> => {
  const writer = fs.createWriteStream(path);

  const response = await axios.get<Stream>(`${url}/zipball`, {
    headers: { Authorization: `token ${token}` },
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};
