import { Document } from 'mongoose';

export interface Plugin extends Document {
  name: string;
  main: string;
  is_enabled: boolean;
  version: string;
  description?: string;
  author?: string;
}
