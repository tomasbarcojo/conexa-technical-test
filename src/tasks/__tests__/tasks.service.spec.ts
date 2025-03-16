import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from '../../movies/entities/movies.entity';
import { Repository } from 'typeorm';
import { TasksService } from '../tasks.service';
import { SwApi } from '../../integrations/sw_api';
import { Logger } from '@nestjs/common';
import { mockLogger } from './__mocks__/logger.mock';
import { movieMock } from './__mocks__/movie.mock';

describe('TasksService', () => {
  let service: TasksService;
  let swApi: SwApi;
  let moviesRepository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: Logger,
          useValue: mockLogger,
        },
        {
          provide: SwApi,
          useValue: {
            getAllMovies: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    swApi = module.get<SwApi>(SwApi);
    moviesRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize with the correct dependencies', () => {
    expect(service).toBeInstanceOf(TasksService);
    expect(service['swApi']).toBe(swApi);
    expect(service['moviesRepository']).toBe(moviesRepository);
  });

  it('should not save any movie if there are no movies from API', async () => {
    // Mocking the return value of swApi.getAllMovies
    (swApi.getAllMovies as jest.Mock).mockResolvedValue({ results: [] });

    await service.handleSyncMovies();

    expect(swApi.getAllMovies).toHaveBeenCalled();
    expect(moviesRepository.findOne).not.toHaveBeenCalled();
    expect(moviesRepository.save).not.toHaveBeenCalled();
  });

  it('should return "No films found" if there are no films', async () => {
    (swApi.getAllMovies as jest.Mock).mockResolvedValue({
      results: [movieMock],
    });

    await service.handleSyncMovies();

    expect(swApi.getAllMovies).toHaveBeenCalled();
    expect(moviesRepository.findOne).toHaveBeenCalled();
    expect(moviesRepository.save).toHaveBeenCalled();
  });
});
