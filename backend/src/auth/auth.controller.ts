import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.signIn(user);
  }

  @Post('signup')
  async signup(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    // Check if user already exists
    const existingUser = await this.authService.validateSignUpUser(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    // Create new user
    const newUser = await this.authService.signUp(email, password);
    return this.authService.signIn(newUser);
  }
}
