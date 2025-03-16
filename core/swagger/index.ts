import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export function createdocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('Conexa Technical Test - Movies 🚀')
    .setDescription(
      'This is a technical test for Conexa company where the requirements are to create a REST API using NestJS about handling users, authentication, authorization and handling movies from Star Wars API.\n\nReference to the link below for more information ⬇️',
    )
    .setExternalDoc('Conexa Technical Test', 'https://conexatech.notion.site/Backend-Nest-Ssr-Test-d3fa3d4c614249b2afeac5d8cf98784f')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addServer(`http://localhost:${process.env.PORT}`, 'Local')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  return document;
}
