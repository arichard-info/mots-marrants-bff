import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Word, WordDocument } from './schemas/word.schema';
import { Like, LikeDocument } from './schemas/like.schema';
import { CreateWordDto } from './dto/create-word.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class WordsService {
  constructor(
    @InjectModel(Word.name) private wordModel: Model<WordDocument>,
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
  ) {}

  async findAll(): Promise<Word[]> {
    return this.wordModel.find().populate('likesCount dislikesCount').exec();
  }

  async findUserLast(userId: string): Promise<Word> {
    return this.wordModel.findOne({ user: userId }, {}, { sort: { date: -1 } });
  }

  async delete(wordId: string): Promise<any> {
    return this.wordModel.deleteOne({ _id: wordId });
  }

  async validate(wordId: string): Promise<Word> {
    return this.wordModel.findOneAndUpdate({ _id: wordId }, { valid: true });
  }

  async invalidate(wordId: string): Promise<Word> {
    return this.wordModel.findOneAndUpdate({ _id: wordId }, { valid: false });
  }

  async create(createWordDto: CreateWordDto): Promise<Word> {
    const createdWord = new this.wordModel(createWordDto);
    return createdWord.save();
  }

  async like(wordId: string, userId: string) {
    return this.updateLike(wordId, userId, 1);
  }

  async dislike(wordId: string, userId: string) {
    return this.updateLike(wordId, userId, -1);
  }

  async updateLike(wordId: string, userId: string, value: number) {
    const word = await this.wordModel.findOne({ _id: wordId });
    if (!word) throw new NotFoundException();

    return this.likeModel.findOneAndUpdate(
      { word: new Types.ObjectId(wordId), user: new Types.ObjectId(userId) },
      {
        value,
        date: Date.now(),
      },
      {
        upsert: true,
        new: true,
      },
    );
  }
}
