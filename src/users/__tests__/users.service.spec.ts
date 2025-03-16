import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, HttpException } from '@nestjs/common';
import { UserRoles } from '../../../core/enums/user_roles.enum';
import { CreateUserInput } from '../dto/create-user-input.dto';
import { GetAllUsersInput } from '../dto/get-all-user-input.dto';
import { GetOneUserInput } from '../dto/get-one-user-input.dto';
import { UpdateUserInput } from '../dto/update-user-input.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            preload: jest.fn(),
            softRemove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<jest.Mocked<Repository<User>>>(
      getRepositoryToken(User),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkUserRole', () => {
    it('should throw an error if user is not an admin', async () => {
      usersRepository.findOne.mockResolvedValue({
        id: 1,
        role: UserRoles.USER,
      } as User);

      await expect(service.checkUserRole(1)).rejects.toThrow(HttpException);
    });

    it('should not throw an error if user is an admin', async () => {
      usersRepository.findOne.mockResolvedValue({
        id: 1,
        role: UserRoles.ADMIN,
      } as User);

      await expect(service.checkUserRole(1)).resolves.not.toThrow();
    });
  });

  describe('createUser', () => {
    it('should throw an error if user already exists', async () => {
      usersRepository.findOne.mockResolvedValue({ id: 1 } as User);

      await expect(
        service.createUser({
          email: 'test@test.com',
          username: 'test',
        } as CreateUserInput),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create a new user', async () => {
      usersRepository.findOne.mockResolvedValue(null);
      usersRepository.create.mockReturnValue({ id: 1 } as User);
      usersRepository.save.mockResolvedValue({ id: 1 } as User);

      expect(
        await service.createUser({
          email: 'test@test.com',
          username: 'test',
        } as CreateUserInput),
      ).toEqual({ id: 1 });
    });
  });

  describe('getOneUser', () => {
    it('should throw an error if user not found', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      await expect(
        service.getOneUser({ id: 1 } as GetOneUserInput),
      ).rejects.toThrow(HttpException);
    });

    it('should return a user if found', async () => {
      usersRepository.findOne.mockResolvedValue({ id: 1 } as User);

      expect(await service.getOneUser({ id: 1 } as GetOneUserInput)).toEqual({
        id: 1,
      });
    });
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1 }, { id: 2 }] as User[];
      usersRepository.find.mockResolvedValue(users);

      expect(
        await service.getAll({ limit: 10, skip: 0 } as GetAllUsersInput),
      ).toEqual(users);
    });

    it('should return an array of users based on "q" seach query', async () => {
      const users = [{ id: 1 }] as User[];
      usersRepository.find.mockResolvedValue(users);

      expect(
        await service.getAll({
          limit: 10,
          skip: 0,
          q: '1',
        } as GetAllUsersInput),
      ).toEqual(users);
    });
  });

  describe('update', () => {
    it('should throw an error if user not found', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      await expect(
        service.update(1, { username: 'updated' } as UpdateUserInput),
      ).rejects.toThrow(HttpException);
    });

    it('should update the user', async () => {
      usersRepository.findOne.mockResolvedValue({ id: 1 } as User);
      usersRepository.preload.mockResolvedValue({
        id: 1,
        username: 'updated',
      } as User);
      usersRepository.save.mockResolvedValue({
        id: 1,
        username: 'updated',
      } as User);

      expect(
        await service.update(1, { username: 'updated' } as UpdateUserInput),
      ).toEqual({ id: 1, username: 'updated' });
    });
  });

  describe('delete', () => {
    it('should throw an error if user not found', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrow(HttpException);
    });

    it('should delete the user', async () => {
      usersRepository.findOne.mockResolvedValue({ id: 1 } as User);
      usersRepository.softRemove.mockResolvedValue({ id: 1 } as User);

      expect(await service.delete(1)).toEqual({ id: 1 });
    });
  });

  describe('updateAll', () => {
    it('should throw an error if user not found', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      await expect(
        service.updateAll(1, { username: 'updated' } as UpdateUserInput),
      ).rejects.toThrow(HttpException);
    });

    it('should update all fields of the user', async () => {
      usersRepository.findOne.mockResolvedValue({ id: 1 } as User);
      usersRepository.preload.mockResolvedValue({
        id: 1,
        username: 'updated',
      } as User);
      usersRepository.save.mockResolvedValue({
        id: 1,
        username: 'updated',
      } as User);

      expect(
        await service.updateAll(1, { username: 'updated' } as UpdateUserInput),
      ).toEqual({ id: 1, username: 'updated' });
    });
  });
});
