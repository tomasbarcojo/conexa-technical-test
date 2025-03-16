import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { User } from './entities/user.entity';

import { CreateUserInput } from './dto/create-user-input.dto';
import { GetOneUserInput } from './dto/get-one-user-input.dto';
import { GetAllUsersInput } from './dto/get-all-user-input.dto';
import { UpdateUserInput } from './dto/update-user-input.dto';
import { UserRoles } from '../../core/enums/user_roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async checkUserRole(userId: number) {
    const userData = await this.getOneUser({ id: userId });

    if (userData.role !== UserRoles.ADMIN) {
      throw new HttpException('Unauthorized', 401);
    }
  }

  public async createUser(input: CreateUserInput): Promise<User> {
    const { email, username } = input;
    const existing = await this.usersRepository.findOne({
      where: { email, username },
    });
    if (existing) {
      throw new BadRequestException(`User already exists`);
    }

    const created = this.usersRepository.create({
      ...input,
    });

    const saved = await this.usersRepository.save(created);

    return saved;
  }

  public async getOneUser(input: GetOneUserInput): Promise<User | undefined> {
    const existing = await this.usersRepository.findOne({
      where: { ...input },
    });

    if (!existing) {
      throw new HttpException(`User not found`, 404);
    }

    return existing;
  }

  public async getAll(input: GetAllUsersInput): Promise<User[]> {
    const { limit = 10, skip, q } = input;

    const whereCondition = q
      ? [{ id: Like(`%${q}%`) }, { username: Like(`%${q}%`) }]
      : {};

    const users = await this.usersRepository.find({
      where: whereCondition,
      take: limit,
      skip: skip,
      loadRelationIds: true,
    });

    return users;
  }

  public async update(userId: number, input: UpdateUserInput): Promise<User> {
    const existing = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!existing) {
      throw new HttpException(`User not found`, 404);
    }

    const preloaded = await this.usersRepository.preload({
      id: existing.id,
      ...input,
    });

    const saved = await this.usersRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as User;
  }

  public async delete(userId: number): Promise<User> {
    const existing = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!existing) {
      throw new HttpException(`User not found`, 404);
    }

    const clone = { ...existing };

    await this.usersRepository.softRemove(existing);

    return clone as User;
  }

  public async updateAll(id: number, input: UpdateUserInput): Promise<User> {
    const existing = await this.usersRepository.findOne({
      where: { id },
    });

    if (!existing) {
      throw new HttpException(`User not found`, 404);
    }

    const preloaded = await this.usersRepository.preload({
      id: existing.id,
      ...input,
    });

    const saved = await this.usersRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as User;
  }
}
