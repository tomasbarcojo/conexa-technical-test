import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create_movie.dto';
import { GetCurrentUserId } from 'core/common/decorators/get-current-user-id.decorator';
import { UpdateMovieDto } from './dto/update_movie.dto';
import {
  ApiCreateMovieOperation,
  ApiDeleteMovieOperation,
  ApiGetAllMoviesOperation,
  ApiGetOneMovieOperation,
  ApiPutMovieOperation,
  ApiUpdateMovieOperation,
} from './swagger/swagger.decorators';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiGetAllMoviesOperation()
  getAllMovies() {
    return this.moviesService.getAllMovies();
  }

  @Get('/:id')
  @ApiGetOneMovieOperation()
  getOneMovie(@Param('id') id: number) {
    return this.moviesService.getOneMovie(id);
  }

  @Post()
  @ApiCreateMovieOperation()
  async createMovie(
    @GetCurrentUserId() currentUserId: number,
    @Body() data: CreateMovieDto,
  ) {
    await this.moviesService.checkUserRole(currentUserId);
    return this.moviesService.createMovie(data);
  }

  @Patch('/:id')
  @ApiUpdateMovieOperation()
  async updateMovie(
    @GetCurrentUserId() currentUserId: number,
    @Param('id') id: number,
    @Body() data: UpdateMovieDto,
  ) {
    await this.moviesService.checkUserRole(currentUserId);
    return this.moviesService.updateMovie(id, data);
  }

  @Delete('/:id')
  @ApiDeleteMovieOperation()
  async deleteMovie(
    @GetCurrentUserId() currentUserId: number,
    @Param('id') id: number,
  ) {
    await this.moviesService.checkUserRole(currentUserId);
    return this.moviesService.deleteMovie(id);
  }

  @Put('/:id')
  @ApiPutMovieOperation()
  async replaceMovie(
    @GetCurrentUserId() currentUserId: number,
    @Param('id') id: number,
    @Body() data: CreateMovieDto,
  ) {
    await this.moviesService.checkUserRole(currentUserId);
    return this.moviesService.replaceMovie(id, data);
  }
}
