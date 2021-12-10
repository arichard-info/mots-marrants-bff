import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Word, WordDocument } from './schemas/word.schema';
import { Like, LikeDocument } from './schemas/like.schema';
import { CreateWordDto } from './dto/create-word.dto';

@Injectable()
export class WordsService {
  constructor(
    @InjectModel(Word.name) private wordModel: Model<WordDocument>,
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
  ) {}

  async findAll(): Promise<Word[]> {
    return this.wordModel.find().populate('likesCount dislikesCount').exec();
  }

  async create(createWordDto: CreateWordDto): Promise<Word> {
    const createdWord = new this.wordModel(createWordDto);
    return createdWord.save();
  }

  async like(wordId: string) {
    return this.updateLike(wordId, 1);
  }

  async dislike(wordId: string) {
    return this.updateLike(wordId, -1);
  }

  async updateLike(wordId: string, value: number) {
    const word = this.wordModel.findOne({ _id: wordId });
    if (!word) throw new Error('No word found');
    return await this.likeModel.findOneAndUpdate(
      { word: new Types.ObjectId(wordId) },
      {
        value,
        date: Date.now(),
      },
      {
        upsert: true,
      },
    );
  }
}
