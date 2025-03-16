import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from '../entities/movies.entity';
import { UsersService } from '../../users/users.service';
import { UserRoles } from '../../../core/enums/user_roles.enum';
import { HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { movieMock } from '../../tasks/__tests__/__mocks__/movie.mock';
import { userMock } from '../../users/__tests__/__mocks__/user.mock';

describe('MoviesService', () => {
  let service: MoviesService;
  let moviesRepository: jest.Mocked<Repository<Movie>>;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            softDelete: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            getOneUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<jest.Mocked<Repository<Movie>>>(
      getRepositoryToken(Movie),
    );
    usersService = module.get<jest.Mocked<UsersService>>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMovies', () => {
    it('should return an array of movies', async () => {
      const movies = [
        { id: 1, ...movieMock },
        { id: 2, ...movieMock },
      ];
      moviesRepository.find.mockResolvedValue(movies);

      expect(await service.getAllMovies()).toBe(movies);
    });
  });

  describe('getOneMovie', () => {
    it('should return a single movie', async () => {
      const movie = { id: 1, ...movieMock };
      moviesRepository.findOne.mockResolvedValue(movie);

      expect(await service.getOneMovie(1)).toBe(movie);
    });

    it('should return an HttpExeption if a movie is not found', async () => {
      const movie = { id: 1, ...movieMock };
      moviesRepository.findOne.mockResolvedValue(null);

      expect(service.getOneMovie(1)).rejects.toThrow(HttpException);
    });
  });

  describe('checkUserRole', () => {
    it('should throw an error if user is not an admin', async () => {
      usersService.getOneUser.mockResolvedValue({
        ...userMock,
        role: UserRoles.USER,
      });

      await expect(service.checkUserRole(1)).rejects.toThrow(HttpException);
    });

    it('should not throw an error if user is an admin', async () => {
      usersService.getOneUser.mockResolvedValue(userMock);

      await expect(service.checkUserRole(1)).resolves.not.toThrow();
    });
  });

  describe('createMovie', () => {
    it('should throw an error if episode already exists', async () => {
      usersService.getOneUser.mockResolvedValue(userMock);
      moviesRepository.findOne.mockResolvedValue({ id: 1, ...movieMock });

      await expect(
        service.createMovie({
          ...movieMock,
          createdAt: movieMock.createdAt.toISOString(),
          updatedAt: movieMock.updatedAt.toISOString(),
        }),
      ).rejects.toThrow(HttpException);
    });

    it('should create a new movie', async () => {
      usersService.getOneUser.mockResolvedValue(userMock);
      moviesRepository.findOne.mockResolvedValue(null);
      moviesRepository.save.mockResolvedValue({ id: 1, ...movieMock });

      expect(
        await service.createMovie({
          ...movieMock,
          createdAt: movieMock.createdAt.toISOString(),
          updatedAt: movieMock.updatedAt.toISOString(),
        }),
      ).toEqual({ id: 1, ...movieMock });
    });
  });

  describe('updateMovie', () => {
    it('should throw an error if movie not found', async () => {
      usersService.getOneUser.mockResolvedValue({ id: 1, ...userMock });
      moviesRepository.findOne.mockResolvedValue(null);

      await expect(
        service.updateMovie(1, { title: 'Updated Title' }),
      ).rejects.toThrow(HttpException);
    });

    it('should update the movie', async () => {
      usersService.getOneUser.mockResolvedValue({ id: 1, ...userMock });
      moviesRepository.findOne.mockResolvedValue({ id: 1, ...movieMock });

      expect(await service.updateMovie(1, { title: 'Updated Title' })).toEqual(
        'Movie updated',
      );
    });
  });

  describe('deleteMovie', () => {
    it('should throw an error if movie not found', async () => {
      usersService.getOneUser.mockResolvedValue({ id: 1, ...userMock });
      moviesRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteMovie(1)).rejects.toThrow(HttpException);
    });

    it('should delete the movie', async () => {
      usersService.getOneUser.mockResolvedValue({ id: 1, ...userMock });
      moviesRepository.findOne.mockResolvedValue({ id: 1, ...movieMock });

      expect(await service.deleteMovie(1)).toEqual('Movie deleted');
    });
  });
  describe('replaceMovie', () => {
    it('should throw an error if movie not found', async () => {
      usersService.getOneUser.mockResolvedValue({ id: 1, ...userMock });
      moviesRepository.findOne.mockResolvedValue(null);

      await expect(
        service.replaceMovie(1, {
          ...movieMock,
          createdAt: movieMock.createdAt.toISOString(),
          updatedAt: movieMock.updatedAt.toISOString(),
        }),
      ).rejects.toThrow(HttpException);
    });

    it('should replace the movie', async () => {
      usersService.getOneUser.mockResolvedValue({ id: 1, ...userMock });
      moviesRepository.findOne.mockResolvedValue({ id: 1, ...movieMock });

      expect(
        await service.replaceMovie(1, {
          ...movieMock,
          createdAt: movieMock.createdAt.toISOString(),
          updatedAt: movieMock.updatedAt.toISOString(),
        }),
      ).toEqual('Movie replaced');
    });
  });
});
