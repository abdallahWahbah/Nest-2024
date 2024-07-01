import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap()
{
    const app = await NestFactory.create(AppModule);
    await app.listen(3000) // listen for incoming traffic on a particular port in the computer
}

bootstrap()