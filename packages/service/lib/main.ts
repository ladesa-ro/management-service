import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import compression from "compression";
import helmet from "helmet";
import { AppConfigService } from "@/infrastructure/config";
import "reflect-metadata";
import { apiReference } from "@scalar/nestjs-api-reference";
import openapi from "@/application/#/openapi.v3.json";
import { AppModule } from "./application/app.module";

async function setupApp() {
  const app = await NestFactory.create(AppModule);

  //

  const configService = app.get(AppConfigService);

  //

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );

  app.enableCors();

  //

  const prefix = configService.getRuntimePrefix();

  if (prefix) {
    app.setGlobalPrefix(prefix, { exclude: ["health"] });
  }

  //

  app.use(compression());

  //
  const expressApp = app.getHttpAdapter().getInstance<Express>();
  expressApp.get(`${prefix}docs/openapi.v3.json`, (req, res) => res.send(openapi));

  app.use(
    `${prefix}docs/scalar`,
    apiReference({
      url: `${prefix}docs/openapi.v3.json`,
    }),
  );

  SwaggerModule.setup(`${prefix}docs/swagger`, app, openapi);

  //

  return app;
}

async function bootstrap() {
  //
  const app = await setupApp();
  const appConfigService = app.get(AppConfigService);
  const port = appConfigService.getRuntimePort();
  await app.listen(port);
}

bootstrap();
