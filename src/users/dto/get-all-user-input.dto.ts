import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetAllUsersInput {
  @ApiPropertyOptional({
    description: 'rows limit',
    type: 'number',
    example: 10,
  })
  @IsOptional()
  @IsNumberString()
  readonly limit?: number;

  @ApiPropertyOptional({
    description: 'rows to skip',
    type: 'number',
    example: 0,
  })
  @IsOptional()
  @IsNumberString()
  readonly skip?: number;

  @ApiPropertyOptional({
    description: 'search string by id or username',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  readonly q?: string;
}
