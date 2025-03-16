import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    description: 'the id of the user',
    type: 'number',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'the first name of the user',
    type: 'string',
    example: 'Tomas',
  })
  @Column({ type: 'varchar', length: 160, nullable: false })
  firstName: string;

  @ApiProperty({
    description: 'the last name of the user',
    type: 'string',
    example: 'Barcojo',
  })
  @Column({ type: 'varchar', length: 160, nullable: false })
  lastName: string;

  @ApiProperty({
    description: 'the email of the user',
    type: 'string',
    example: 'tomasbarcojo@gmail.com',
  })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @ApiProperty({
    description: 'the username of the user',
    type: 'string',
    example: 'tomasbarcojo',
  })
  @Column({ type: 'varchar', length: 16, nullable: false, unique: true })
  username: string;

  @ApiProperty({
    description: 'the password of the user (hashed)',
    type: 'string',
    example: '',
  })
  @Column({ type: 'text', nullable: false })
  password: string;

  @ApiProperty({
    description: 'the role of the user',
    type: 'string',
    example: 'user',
  })
  @Column({ type: 'varchar', length: 16, nullable: false, default: 'user' })
  role: string;

  @ApiProperty({
    description: 'the date of creation of the user',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'the date of update of the user',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'the date of deletion of the user',
    type: 'string',
    example: '2020-01-01T00:00:00.000Z',
  })
  @DeleteDateColumn()
  deletedAt: Date;
}
