import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { Movie } from '../entities/movies.entity';

const movieExample = {
  id: 1,
  title: 'A New Hope',
  episode_id: 4,
  opening_crawl:
    "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
  director: 'George Lucas',
  producer: 'Gary Kurtz, Rick McCallum',
  release_date: '1977-05-24',
  species: [
    'https://swapi.dev/api/species/1/',
    'https://swapi.dev/api/species/2/',
    'https://swapi.dev/api/species/3/',
    'https://swapi.dev/api/species/4/',
    'https://swapi.dev/api/species/5/',
  ],
  starships: [
    'https://swapi.dev/api/starships/2/',
    'https://swapi.dev/api/starships/3/',
    'https://swapi.dev/api/starships/5/',
    'https://swapi.dev/api/starships/9/',
    'https://swapi.dev/api/starships/10/',
    'https://swapi.dev/api/starships/11/',
    'https://swapi.dev/api/starships/12/',
    'https://swapi.dev/api/starships/13/',
  ],
  vehicles: [
    'https://swapi.dev/api/vehicles/4/',
    'https://swapi.dev/api/vehicles/6/',
    'https://swapi.dev/api/vehicles/7/',
    'https://swapi.dev/api/vehicles/8/',
  ],
  characters: [
    'https://swapi.dev/api/people/1/',
    'https://swapi.dev/api/people/2/',
    'https://swapi.dev/api/people/3/',
    'https://swapi.dev/api/people/4/',
    'https://swapi.dev/api/people/5/',
    'https://swapi.dev/api/people/6/',
    'https://swapi.dev/api/people/7/',
    'https://swapi.dev/api/people/8/',
    'https://swapi.dev/api/people/9/',
    'https://swapi.dev/api/people/10/',
    'https://swapi.dev/api/people/12/',
    'https://swapi.dev/api/people/13/',
    'https://swapi.dev/api/people/14/',
    'https://swapi.dev/api/people/15/',
    'https://swapi.dev/api/people/16/',
    'https://swapi.dev/api/people/18/',
    'https://swapi.dev/api/people/19/',
    'https://swapi.dev/api/people/81/',
  ],
  planets: [
    'https://swapi.dev/api/planets/1/',
    'https://swapi.dev/api/planets/2/',
    'https://swapi.dev/api/planets/3/',
  ],
  url: 'https://swapi.dev/api/films/1/',
  createdAt: '2025-03-16T19:25:05.225Z',
  updatedAt: '2025-03-16T19:25:05.225Z',
  deletedAt: null,
};

export function ApiGetAllMoviesOperation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get a list of movies',
      description: 'Get a list of all movies',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'List of movies',
      type: [Movie],
      example: [movieExample],
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'No movies found',
      example: {
        statusCode: 404,
        message: 'No movies found',
      },
    }),
  );
}

export function ApiGetOneMovieOperation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get a movie',
      description: 'Get a movie based on the id',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'A movie',
      type: Movie,
      example: movieExample,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Movie not found',
      example: {
        statusCode: 404,
        message: 'Movie not found',
      },
    }),
  );
}

export function ApiCreateMovieOperation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a movie',
      description: 'Create a new movie',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The movie has been successfully created',
      type: Movie,
      example: movieExample,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input',
      example: {
        statusCode: 400,
        message: 'Invalid input',
      },
    }),
  );
}

export function ApiUpdateMovieOperation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update a movie',
      description: 'Update a movie based on the id',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The updated movie',
      type: Movie,
      example: movieExample,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input',
      example: {
        statusCode: 400,
        message: 'Invalid input',
      },
    }),
  );
}

export function ApiDeleteMovieOperation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete a movie',
      description: 'Delete a movie based on the id',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The movie has been successfully deleted',
      type: Movie,
      example: 'Movie deleted',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Movie not found',
      example: {
        statusCode: 404,
        message: 'Movie not found',
      },
    }),
  );
}

export function ApiPutMovieOperation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Replace a movie',
      description: 'Replace a movie based on the id',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The movie has been successfully replaced',
      type: Movie,
      example: 'Movie replaced',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Movie not found',
      example: {
        statusCode: 404,
        message: 'Movie not found',
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input',
      example: {
        message: [
          'episode_id must be an integer number',
          'opening_crawl must be a string',
          'director must be a string',
          'producer must be a string',
          'release_date must be a valid ISO 8601 date string',
          'each value in species must be a string',
          'species must be an array',
          'each value in starships must be a string',
          'starships must be an array',
          'each value in vehicles must be a string',
          'vehicles must be an array',
          'each value in characters must be a string',
          'characters must be an array',
          'each value in planets must be a string',
          'planets must be an array',
          'url must be a URL address',
          'createdAt must be a valid ISO 8601 date string',
          'updatedAt must be a valid ISO 8601 date string',
          'deletedAt must be a valid ISO 8601 date string',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    }),
  );
}
