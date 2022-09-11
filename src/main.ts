import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true
    });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    );

    const options = new DocumentBuilder()
        .setTitle("OpenZeppelin Defender Relayer Example")
        .setDescription("OpenZeppelin Defender Relayer Example")
        .setVersion("1.0")
        .addBasicAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup("swagger", app, document);
    await app.listen(3000);
}
bootstrap();
