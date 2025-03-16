import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { Tokens } from './types';
import { CreateUserInput } from '../users/dto/create-user-input.dto';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { ChangePasswordDto } from './dto/change_password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async registerUser(dto: CreateUserInput): Promise<Tokens> {
    const existing = await this.userService.getOneUser({
      email: dto.email,
      username: dto.username,
    });

    if (existing) {
      throw new HttpException('User already exists', 400);
    }

    const hashedPassword = await this.hashData(dto.password);

    const newUser = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    return tokens;
  }

  async logInUser(
    dto: AuthDto,
  ): Promise<{ tokens: Tokens; user: Partial<User> }> {
    const user = await this.userService.getOneUser({ username: dto.username });

    if (!user) throw new HttpException('The user does not exist', 404);

    const passwordMatches = await argon.verify(user.password, dto.password);

    if (!passwordMatches)
      throw new HttpException('Invalid username or password', 401);

    const tokens = await this.getTokens(user.id, user.email);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return { tokens, user: rest };
  }

  async hashData(data: string) {
    return await argon.hash(data);
  }

  async changePassword(dto: ChangePasswordDto) {
    const user = await this.userService.getOneUser({ username: dto.username });

    if (!user) throw new HttpException('User does not exist', 404);

    const passwordMatches = await argon.verify(user.password, dto.password);

    if (!passwordMatches) throw new HttpException('Access Denied', 401);

    const hashedPassword = await this.hashData(dto.newPassword);

    await this.userService.update(user.id, { password: hashedPassword });

    const tokens = await this.getTokens(user.id, user.email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return { tokens, user: rest };
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [at] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_AT_SECRET_KEY'),
          expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      ),
    ]);

    return {
      access_token: at,
    };
  }
}
