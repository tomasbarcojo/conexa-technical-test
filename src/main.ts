import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { createdocument } from 'core/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  SwaggerModule.setup('swagger/docs', app, createdocument(app), {
    swaggerOptions: {
      persistAuthorization: true,
      responseInterceptor: (res) => {
        if (res.url.includes('/auth/login')) {
          const token = res.body?.tokens.access_token;
          if (token) {
            window.localStorage.setItem(
              'authorized',
              JSON.stringify({
                name: 'bearer',
                schema: {
                  scheme: 'bearer',
                  bearerFormat: 'JWT',
                  type: 'http',
                },
                value: token,
              }),
            );
          }
        }
        return res;
      },
      requestInterceptor: (req) => {
        const authorizationData = window.localStorage.getItem('authorized');
        const token = authorizationData
          ? JSON.parse(authorizationData).value
          : null;
        if (token) {
          req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
      },
    },
  });

  await app.listen(process.env.PORT);
}
bootstrap();
