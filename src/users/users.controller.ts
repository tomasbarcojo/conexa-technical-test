import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { User } from './entities/user.entity';

import { UsersService } from './users.service';

import { GetAllUsersInput } from './dto/get-all-user-input.dto';
import { GetOneUserInput } from './dto/get-one-user-input.dto';
import { UpdateUserInput } from './dto/update-user-input.dto';
import {
  ApiDeleteUserOperation,
  ApiGetAllUsersOperation,
  ApiGetOneUserOperation,
  ApiPutUserOperation,
  ApiUpdateUserOperation,
} from './swagger/swagger.decorators';
import { CreateUserInput } from './dto/create-user-input.dto';
import { GetCurrentUserId } from 'core/common/decorators/get-current-user-id.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @ApiGetAllUsersOperation()
  async getAll(
    @GetCurrentUserId() currentUserId: number,
    @Query() input: GetAllUsersInput,
  ): Promise<User[]> {
    await this.service.checkUserRole(currentUserId);
    return this.service.getAll(input);
  }

  @Get('/:id')
  @ApiGetOneUserOperation()
  async getOne(
    @GetCurrentUserId() currentUserId: number,
    @Param('id') id: number,
  ): Promise<User> {
    await this.service.checkUserRole(currentUserId);
    return this.service.getOneUser({ id });
  }

  @Patch('/:id')
  @ApiUpdateUserOperation()
  async update(
    @GetCurrentUserId() currentUserId: number,
    @Param('id') userId: number,
    @Body() input: UpdateUserInput,
  ): Promise<User> {
    await this.service.checkUserRole(currentUserId);
    return this.service.update(userId, input);
  }

  @Delete('/:id')
  @ApiDeleteUserOperation()
  async delete(
    @GetCurrentUserId() currentUserId: number,
    @Param('id') userId: number,
  ): Promise<User> {
    await this.service.checkUserRole(currentUserId);
    return this.service.delete(userId);
  }

  @Put('/:id')
  @ApiPutUserOperation()
  async updateAll(
    @GetCurrentUserId() currentUserId: number,
    @Param('id') id: number,
    @Body() input: CreateUserInput,
  ): Promise<User> {
    await this.service.checkUserRole(currentUserId);
    return this.service.updateAll(id, input);
  }
}
