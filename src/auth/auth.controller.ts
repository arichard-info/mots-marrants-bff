import {
  Controller,
  Request,
  Response,
  Post,
  UseGuards,
  Body,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';
import { GoogleAuthGuard } from './strategies/google/google-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body, @Response() res) {
    return this.authService.signup(body, res);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req, @Response() res) {
    return this.authService.login(req.user, res);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() req, @Response() res) {
    return this.authService.login(req.user, res);
  }
}
