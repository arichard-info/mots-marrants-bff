import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { Word } from './schemas/word.schema';
import { CreateWordDto } from './dto/create-word.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { LimitationGuard } from './words.guards';
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

  @UseGuards(JwtAuthGuard, LimitationGuard)
  @Post()
  addWord(
    @Body() createWordBody: CreateWordDto,
    @Request() req,
  ): Promise<Word> {
    return this.wordsService.create({
      ...createWordBody,
      user: req?.user?._id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  deleteWord(@Param() params) {
    return this.wordsService.delete(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post('/:id/validate')
  validateWord(@Param() params) {
    return this.wordsService.validate(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post('/:id/invalidate')
  invalidateWord(@Param() params) {
    return this.wordsService.invalidate(params.id);
  }
}
