import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'core/config/app.config';
import { dataSourceOptions } from './ormconfig';
import { MoviesModule } from './movies/movies.module';
import appConfigSchema from 'core/config/app.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks/tasks.service';
import { AtGuard } from 'core/common/guards';
import { APP_GUARD } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: appConfigSchema,
    }),

    // TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...dataSourceOptions,
          logging: configService.get<string>('config.database.log') === 'yes',
          timezone: 'Z',
          autoLoadEntities: true,
        };
      },
    }),

    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    MoviesModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
