import axios from 'axios';
import { Movie } from 'src/movies/entities/movies.entity';
import { SwResponse } from './interfaces/sw_response.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SwApi {
  private readonly baseUrl = 'https://swapi.dev/api/';

  async getAllMovies(): Promise<SwResponse<Movie>> {
    const response = await axios.get(`${this.baseUrl}films/`);
    return response.data;
  }
}
