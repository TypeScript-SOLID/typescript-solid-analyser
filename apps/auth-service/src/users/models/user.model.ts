import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true }) domain: string;
  @Prop({ required: true, unique: true }) login: string;
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ required: true }) avatar_url: string;
  @Prop({ required: true }) repos_url: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
