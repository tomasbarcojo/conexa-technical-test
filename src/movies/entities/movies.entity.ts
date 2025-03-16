import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int' })
  episode_id: number;

  @Column({ type: 'text' })
  opening_crawl: string;

  @Column({ type: 'varchar', length: 255 })
  director: string;

  @Column({ type: 'varchar', length: 255 })
  producer: string;

  @Column({ type: 'date' })
  release_date: string;

  @Column('simple-array')
  species: string[];

  @Column('simple-array')
  starships: string[];

  @Column('simple-array')
  vehicles: string[];

  @Column('simple-array')
  characters: string[];

  @Column('simple-array')
  planets: string[];

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
