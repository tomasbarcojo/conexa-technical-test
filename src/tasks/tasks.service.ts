import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { SwApi } from '../integrations/sw_api';
import { Movie } from '../movies/entities/movies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly swApi: SwApi,
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  @Cron('*/5 * * * *')
  async handleSyncMovies() {
    this.logger.log('Syncing movies...');
    const films = await this.swApi.getAllMovies();

    if (films.results.length === 0) {
      this.logger.error('No films found');
      return;
    }

    for (const film of films.results) {
      const movie = await this.moviesRepository.findOne({
        where: { episode_id: film.episode_id },
      });

      if (!movie) {
        await this.moviesRepository.save(film);
      }
    }

    this.logger.log('Movies synced');
    return 'Movies synced';
  }
}
