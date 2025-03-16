import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('sync-movies')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Synchronize movies' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movies synced',
    example: 'Movies synced',
  })
  syncMovies() {
    return this.tasksService.handleSyncMovies();
  }
}
