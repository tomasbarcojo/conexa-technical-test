import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'tomasbarcojo',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Current password of the user',
    example: '1234',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'New password for the user',
    example: 'newPassword1234',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  newPassword?: string;
}
