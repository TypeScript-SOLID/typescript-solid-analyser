import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Plugin extends Document {
  @Prop({ required: true, unique: true }) name: string;
  @Prop({ required: true }) main: string;
  @Prop({ default: false }) is_enabled: boolean;
  @Prop({ required: true }) version: string;
  @Prop({ required: false }) description: string;
  @Prop({ required: false }) author: string;
}

export const PluginSchema = SchemaFactory.createForClass(Plugin);
