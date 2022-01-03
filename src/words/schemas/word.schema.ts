import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type WordDocument = Word & mongoose.Document;

@Schema({
  toJSON: {
    getters: true,
  },
})
export class Word {
  @Prop({ required: true })
  value: string;

  @Prop()
  valid: boolean;

  @Prop()
  date: Date;

  @Prop({ ref: 'user' })
  user: mongoose.Types.ObjectId;
}

const WordSchema = SchemaFactory.createForClass(Word);

WordSchema.virtual('likesCount', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'word',
  count: true,
  match: { value: 1 },
});

WordSchema.virtual('dislikesCount', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'word',
  count: true,
  match: { value: -1 },
});

// WordSchema.virtual('likesCount').get(async function () {});

export { WordSchema };
