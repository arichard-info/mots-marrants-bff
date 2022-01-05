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
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('words')
@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all words' })
  @ApiResponse({
    status: 200,
    description: 'Array of words',
    type: [Word],
  })
  findAll(): Promise<Word[]> {
    return this.wordsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, LimitationGuard)
  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'Create a word' })
  @ApiResponse({
    status: 200,
    description: 'The created word',
    type: Word,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden operation',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, you need to log in',
  })
  addWord(
    @Body() createWordBody: CreateWordDto,
    @Request() req,
  ): Promise<Word> {
    return this.wordsService.create({
      ...createWordBody,
      user: req?.user?._id,
    });
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'Delete a word' })
  @ApiResponse({
    status: 200,
    description: 'Word has been deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden operation',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, you need to log in',
  })
  deleteWord(@Param('id') id: string) {
    return this.wordsService.delete(id);
  }

  @Post('/:id/like')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'Like a word' })
  @ApiResponse({
    status: 200,
    description: 'The updated word',
    type: Word,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, you need to log in',
  })
  likeWord(@Param('id') id: string, @Request() req) {
    return this.wordsService.like(id, req.user._id);
  }

  @Post('/:id/dislike')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'Dislike a word' })
  @ApiResponse({
    status: 200,
    description: 'The updated word',
    type: Word,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, you need to log in',
  })
  dislikeWord(@Param('id') id: string, @Request() req) {
    return this.wordsService.dislike(id, req.user._id);
  }

  @Post('/:id/validate')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'Validate a word' })
  @ApiResponse({
    status: 200,
    description: 'The updated word',
    type: Word,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden operation',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, you need to log in',
  })
  validateWord(@Param('id') id: string) {
    return this.wordsService.validate(id);
  }

  @Post('/:id/invalidate')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'Invalidate a word' })
  @ApiResponse({
    status: 200,
    description: 'The updated word',
    type: Word,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden operation',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, you need to log in',
  })
  invalidateWord(@Param('id') id: string) {
    return this.wordsService.invalidate(id);
  }
}
