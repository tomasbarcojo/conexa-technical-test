import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

const srcPath = __dirname;

// Load environment variables defined in the .env file
dotenv.config();

export const dataSourceOptions = {
  type: process.env.MYSQL_CLIENT as any,
  host: process.env.MYSQL_DB_HOST,
  port: +process.env.MYSQL_DB_PORT,
  username: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  entities: [srcPath + '/**/*.entity{.ts,.js}'],
  migrations: [srcPath + '/database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};

export const dataSource = new DataSource(dataSourceOptions);
