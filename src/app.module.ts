import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WordsModule } from './words/words.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/mots-marrants'),
    WordsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
