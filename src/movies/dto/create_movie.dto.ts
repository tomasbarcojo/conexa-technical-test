import { IsString, IsInt, IsArray, IsDateString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ description: 'The title of the movie' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The episode ID of the movie' })
  @IsInt()
  episode_id: number;

  @ApiProperty({ description: 'The opening crawl text of the movie' })
  @IsString()
  opening_crawl: string;

  @ApiProperty({ description: 'The director of the movie' })
  @IsString()
  director: string;

  @ApiProperty({ description: 'The producer of the movie' })
  @IsString()
  producer: string;

  @ApiProperty({ description: 'The release date of the movie' })
  @IsDateString()
  release_date: string;

  @ApiProperty({ description: 'The species featured in the movie', type: [String] })
  @IsArray()
  @IsString({ each: true })
  species: string[];

  @ApiProperty({ description: 'The starships featured in the movie', type: [String] })
  @IsArray()
  @IsString({ each: true })
  starships: string[];

  @ApiProperty({ description: 'The vehicles featured in the movie', type: [String] })
  @IsArray()
  @IsString({ each: true })
  vehicles: string[];

  @ApiProperty({ description: 'The characters featured in the movie', type: [String] })
  @IsArray()
  @IsString({ each: true })
  characters: string[];

  @ApiProperty({ description: 'The planets featured in the movie', type: [String] })
  @IsArray()
  @IsString({ each: true })
  planets: string[];

  @ApiProperty({ description: 'The URL of the movie' })
  @IsUrl()
  url: string;

  @ApiProperty({ description: 'The creation date of the movie record' })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ description: 'The last edited date of the movie record' })
  @IsDateString()
  updatedAt: string;

  @ApiProperty({ description: 'The deletion date of the movie record' })
  @IsDateString()
  deletedAt: string;
}
