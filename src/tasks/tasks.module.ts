import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movies.entity';
import { TasksController } from './tasks.controller';
import { SwApi } from 'src/integrations/sw_api';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [TasksService, SwApi],
  controllers: [TasksController],
})
export class TasksModule {}
