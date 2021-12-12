import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type LikeDocument = Like & mongoose.Document;

@Schema()
export class Like {
  @Prop({ required: true })
  value: number;

  @Prop()
  date: Date;

  @Prop({ ref: 'word' })
  word: mongoose.Types.ObjectId;

  @Prop({ ref: 'user' })
  user: mongoose.Types.ObjectId;
}

const LikeSchema = SchemaFactory.createForClass(Like);

LikeSchema.index({ word: 1, user: 1 }, { unique: true });

export { LikeSchema };
