import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { hash } from 'bcrypt';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ unique: true, index: true })
  username: string;

  @Prop()
  password?: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ default: 'visitor' })
  role: string;

  @Prop({ unique: true, sparse: true })
  googleId?: string;
}

const UserSchema = SchemaFactory.createForClass(User);

async function preSaveHook(next) {
  // Only run this function if password was modified
  if (!this.isModified('password')) return next();
  // Hash the password
  const password = await hash(this.password, 12);
  this.set('password', password);
  next();
}

UserSchema.pre<User>('save', preSaveHook);

// UserSchema.virtual('likes', {
//   ref: 'Like',
//   localField: '_id',
//   foreignField: 'user',
// });

export { UserSchema };
