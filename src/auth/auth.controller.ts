import {
  Controller,
  Request,
  Response,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req, @Response() res) {
    return this.authService.login(req.user, res);
  }

  @Post('auth/signup')
  signup(@Body() body, @Response() res) {
    return this.authService.signup(body, res);
  }
}
