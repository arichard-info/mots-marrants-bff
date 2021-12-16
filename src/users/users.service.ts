import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User> {
    return (await this.userModel.findOne({ username })).toObject();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return (await user.save()).toObject();
  }

  async syncProviderUser(createUserDto: CreateUserDto): Promise<User> {
    const query: any = {};
    if (createUserDto.googleId) query.googleId = createUserDto.googleId;
    const user = await this.userModel.findOne(query);
    if (user) return user.toObject();
    return this.create(createUserDto);
  }
}
