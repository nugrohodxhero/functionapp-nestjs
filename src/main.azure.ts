const tracer = require('dd-trace').init()
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function createApp(): Promise<INestApplication> {
  return await tracer.trace('web.request', async () => {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    
    await app.init();
    return app;
  })
}
