import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { Word } from './schemas/word.schema';
import { CreateWordDto } from './dto/create-word.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt/jwt-auth.guard';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  findAll(): Promise<Word[]> {
    return this.wordsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/like')
  likeWord(@Param() params, @Request() req) {
    return this.wordsService.like(params.id, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/dislike')
  dislikeWord(@Param() params, @Request() req) {
    return this.wordsService.dislike(params.id, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addWord(@Body() createWordBody: CreateWordDto): Promise<Word> {
    return this.wordsService.create(createWordBody);
  }
}
