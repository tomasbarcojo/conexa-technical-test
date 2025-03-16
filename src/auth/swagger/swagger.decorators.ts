import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export function ApiLoginOperation() {
  return applyDecorators(
    ApiOperation({ summary: 'Log in a user' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User logged in successfully',
      example: {
        tokens: {
          access_token: 'e1234token',
        },
        user: {
          id: 1,
          firstName: 'Tomas',
          lastName: 'Barcojo',
          email: 'tomasbarcojo@gmail.com',
          username: 'tomasbarcojo',
          role: 'admin',
          createdAt: '2025-03-16T06:11:07.300Z',
          updatedAt: '2025-03-16T06:11:07.300Z',
          deletedAt: null,
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'The user does not exist',
      example: {
        statusCode: 404,
        message: 'The user does not exist',
      },
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid username or password',
      example: {
        statusCode: 401,
        message: 'Invalid username or password',
      },
    }),
  );
}

export function ApiRegisterOperation() {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new user' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User registered successfully',
      example: {
        access_token:
          'ey123token',
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'User already exists',
      example: {
        statusCode: 400,
        message: 'User already exists',
      },
    }),
  );
}

export function ApiChangePasswordOperation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Change user password' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Password changed successfully',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input',
    }),
  );
}
