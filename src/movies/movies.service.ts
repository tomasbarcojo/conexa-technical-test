import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from './entities/movies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create_movie.dto';
import { UsersService } from '../users/users.service';
import { UserRoles } from '../../core/enums/user_roles.enum';
import { UpdateMovieDto } from './dto/update_movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    private readonly usersService: UsersService,
  ) {}

  async getAllMovies() {
    return await this.moviesRepository.find();
  }

  async getOneMovie(id: number) {
    const movie = await this.moviesRepository.findOne({ where: { id } });

    if (!movie) {
      throw new HttpException('Movie not found', 404);
    }

    return movie;
  }

  async checkUserRole(userId: number) {
    const userData = await this.usersService.getOneUser({ id: userId });

    if (userData.role !== UserRoles.ADMIN) {
      throw new HttpException('Unauthorized', 401);
    }
  }

  async createMovie(data: CreateMovieDto) {
    const isEpisodeExists = await this.moviesRepository.findOne({
      where: { episode_id: data.episode_id },
    });

    if (isEpisodeExists) {
      throw new HttpException('Episode already exists', 400);
    }

    return await this.moviesRepository.save(data);
  }

  async updateMovie(id: number, data: UpdateMovieDto) {
    const movie = await this.moviesRepository.findOne({ where: { id } });

    if (!movie) {
      throw new HttpException('Movie not found', 404);
    }

    await this.moviesRepository.update(id, data);

    return 'Movie updated';
  }

  async deleteMovie(id: number) {
    const movie = await this.moviesRepository.findOne({ where: { id } });

    if (!movie) {
      throw new HttpException('Movie not found', 404);
    }

    await this.moviesRepository.softDelete(id);

    return 'Movie deleted';
  }

  async replaceMovie(id: number, data: CreateMovieDto) {
    const movie = await this.moviesRepository.findOne({ where: { id } });

    if (!movie) {
      throw new HttpException('Movie not found', 404);
    }

    await this.moviesRepository.update(id, data);

    return 'Movie replaced';
  }
}
