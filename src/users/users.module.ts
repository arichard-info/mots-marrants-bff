import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';

import { User, UserSchema } from './schemas/user.schema';
import { Like, LikeSchema } from './../words/schemas/like.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
