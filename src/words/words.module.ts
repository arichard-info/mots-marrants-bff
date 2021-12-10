import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

import { Word, WordSchema } from './schemas/word.schema';
import { Like, LikeSchema } from './schemas/like.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }]),
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
