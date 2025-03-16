import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { Movie } from 'src/movies/entities/movies.entity';
import { SwApi } from '..';
import { SwResponse } from '../interfaces/sw_response.interface';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SwApi', () => {
  let service: SwApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwApi],
    }).compile();

    service = module.get<SwApi>(SwApi);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMovies', () => {
    it('should return all movies', async () => {
      const movies: SwResponse<Movie> = {
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            title: 'A New Hope',
            episode_id: 4,
            opening_crawl: 'It is a period of civil war...',
            director: 'George Lucas',
            producer: 'Gary Kurtz, Rick McCallum',
            release_date: '1977-05-25',
            id: 0,
            species: [],
            starships: [],
            vehicles: [],
            characters: [],
            planets: [],
            url: '',
            createdAt: undefined,
            updatedAt: undefined,
            deletedAt: undefined,
          },
        ],
      };

      mockedAxios.get.mockResolvedValue({ data: movies });

      const result = await service.getAllMovies();
      expect(result).toEqual(movies);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://swapi.dev/api/films/',
      );
    });

    it('should throw an error if the request fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network Error'));

      await expect(service.getAllMovies()).rejects.toThrow('Network Error');
    });
  });
});
