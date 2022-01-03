import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { Role } from './../auth/roles/role.enum';

@Injectable()
export class LimitationGuard implements CanActivate {
  constructor(@Inject(WordsService) private wordsService: WordsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) return false;
    if (user.role === Role.Admin) return true;
    const lastWord = await this.wordsService.findUserLast(user._id);
    return (
      !lastWord ||
      new Date(lastWord.date).getTime() + 60 * 60 * 24 * 1000 < Date.now()
    );
  }
}
