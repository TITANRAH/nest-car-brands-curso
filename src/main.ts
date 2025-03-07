import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // esto es que si espero 2 propiedades definidasa por un dto y me mandan mas , las filtray toma las
        // que corresponden y ya
      forbidNonWhitelisted: true // pero al poner esto si me mandan mas propiedades de las que espero devuelve un error
    })
  )
  await app.listen(3000);
}
main();
