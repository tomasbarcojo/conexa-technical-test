import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';
import { CreateUserInput } from '../users/dto/create-user-input.dto';
import { User } from '../users/entities/user.entity';
import { Public } from 'core/common/decorators/public.decorator';
import { ChangePasswordDto } from './dto/change_password.dto';
import {
  ApiChangePasswordOperation,
  ApiLoginOperation,
  ApiRegisterOperation,
} from './swagger/swagger.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  @ApiLoginOperation()
  logInUser(
    @Body() dto: AuthDto,
  ): Promise<{ tokens: Tokens; user: Partial<User> }> {
    return this.authService.logInUser(dto);
  }

  @Public()
  @Post('/register')
  @ApiRegisterOperation()
  registerUser(@Body() dto: CreateUserInput): Promise<Tokens> {
    return this.authService.registerUser(dto);
  }

  @Post('/change-password')
  @ApiChangePasswordOperation()
  changePassword(
    @Body() dto: ChangePasswordDto,
  ): Promise<{ tokens: Tokens; user: Partial<User> }> {
    return this.authService.changePassword(dto);
  }
}
