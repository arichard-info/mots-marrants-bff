import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;
}

const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.virtual('likes', {
//   ref: 'Like',
//   localField: '_id',
//   foreignField: 'user',
// });

export { UserSchema };
