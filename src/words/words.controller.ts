import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { WordsService } from './words.service';
import { Word } from './schemas/word.schema';
import { Like } from './schemas/like.schema';
import { CreateWordDto } from './dto/create-word.dto';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  findAll(): Promise<Word[]> {
    return this.wordsService.findAll();
  }

  @Post('/:id/like')
  likeWord(@Param() params) {
    return this.wordsService.like(params.id);
  }

  @Post('/:id/dislike')
  dislikeWord(@Param() params) {
    return this.wordsService.dislike(params.id);
  }

  @Post()
  addWord(@Body() createWordBody: CreateWordDto): Promise<Word> {
    return this.wordsService.create(createWordBody);
  }
}
