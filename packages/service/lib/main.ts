import { NestFactory } from "@nestjs/core";
import compression from "compression";
import helmet from "helmet";
import { AppConfigService } from "@/infrastructure/config";
import "reflect-metadata";
import { AppModule } from "./application/app.module";

async function setup() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppConfigService);

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );

  app.enableCors();

  const prefix = configService.getRuntimePrefix();

  if (prefix) {
    app.setGlobalPrefix(prefix, { exclude: ["health"] });
  }

  app.use(compression());

  return app;
}

async function bootstrap() {
  const app = await setup();
  const appConfigService = app.get(AppConfigService);
  const port = appConfigService.getRuntimePort();
  await app.listen(port);
}

bootstrap();
