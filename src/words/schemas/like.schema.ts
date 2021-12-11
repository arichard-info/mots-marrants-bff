import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Word } from './word.schema';

export type LikeDocument = Like & mongoose.Document;

@Schema()
export class Like {
  @Prop({ required: true })
  value: number;

  @Prop()
  date: Date;

  @Prop({ ref: 'word' })
  word: mongoose.Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
