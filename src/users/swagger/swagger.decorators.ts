import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { User } from '../entities/user.entity';

export function ApiGetAllUsersOperation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get a list of users',
      description: 'Get a list of users based on the conditions',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'List of users',
      type: [User],
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'No users found',
      example: {
        statusCode: 404,
        message: 'No users found',
      },
    }),
  );
}

export function ApiGetOneUserOperation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get a user',
      description: 'Get a user based on the id',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'A user',
      type: User,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
      example: {
        statusCode: 404,
        message: 'User not found',
      },
    }),
  );
}

export function ApiUpdateUserOperation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update a user',
      description: 'Update a user based on the id',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'An updated user',
      type: User,
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

export function ApiDeleteUserOperation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete a user',
      description: 'Delete a user based on the id',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'A deleted user',
      type: User,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
      example: {
        statusCode: 404,
        message: 'User not found',
      },
    }),
  );
}

export function ApiPutUserOperation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update all properties from a user',
      description: 'Update all properties from a user based on the id',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'An updated user',
      type: User,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input',
      example: {
        message: [
          'firstName must be a string',
          'firstName must be longer than or equal to 1 characters',
          'lastName must be a string',
          'lastName must be longer than or equal to 1 characters',
          'email must be a string',
          'email must be longer than or equal to 1 characters',
          'username must be a string',
          'username must be longer than or equal to 1 characters',
          'password must be a string',
          'password must be longer than or equal to 1 characters',
          'role must be a string',
          'role must be longer than or equal to 1 characters',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    }),
  );
}
