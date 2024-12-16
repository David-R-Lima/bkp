import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyMultipart from '@fastify/multipart';
import { ConfigService } from '@nestjs/config';
import { EnvService } from './infra/env/env.service';
import { Env } from './infra/env/env';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['*'],
  });

  await app.register(fastifyMultipart);

  const envService = app.get<ConfigService<Env, true>>(EnvService);
  const port = envService.get('PORT');

  await app.listen(port, '0.0.0.0').then(() => {
    console.log(`[On BKP] HTTP server running on port: ${port}!`);
  });
}

bootstrap();
