import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type WordDocument = Word & mongoose.Document;

@Schema({
  toJSON: {
    getters: true,
  },
})
export class Word {
  @Prop({ required: true })
  @ApiProperty()
  value: string;

  @Prop()
  @ApiProperty()
  valid: boolean;

  @Prop()
  @ApiProperty()
  date: Date;

  @Prop({ ref: 'user' })
  @ApiProperty({ type: 'string' })
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

export { WordSchema };
