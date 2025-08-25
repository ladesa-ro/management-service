import { NestFactory } from "@nestjs/core";
import compression from "compression";
import helmet from "helmet";
import { AppConfigService } from "@/infrastructure/config";
import "reflect-metadata";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "@/application-nest/app.module";
import { getSchemas } from "@/shared-novo";

async function setup() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppConfigService);

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "https://unpkg.com", "'sha256-o7edkv+OgKBSsAFAX2/oZBLyBKkKSwKR4idD6i6+5TM='", "'sha256-E55b/hKtDvu9PwyJMvhVIYqzNZi2Li6+ATCTtQCZepQ='"],
          styleSrc: ["'self'", "https://unpkg.com", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https://unpkg.com"],
          fontSrc: ["'self'", "https://unpkg.com", "https://fonts.scalar.com"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          frameAncestors: ["'self'"],
        },
      },
      crossOriginResourcePolicy: false,
    }),
  );

  app.enableCors();

  const prefix = configService.getRuntimePrefix();

  if (prefix) {
    app.setGlobalPrefix(prefix, {exclude: ["health"]});
  }

  const config = new DocumentBuilder().setTitle("Exemplo DDD com Schemas").setDescription("API com Estado e Cidade").setVersion("1.0").build();

  const documentFactory = () => {
    const document = SwaggerModule.createDocument(app, config);

    document.components = {
      ...document.components,
      schemas: {
        ...document.components?.schemas,
        ...getSchemas(),
      },
    };

    return document;
  };

  SwaggerModule.setup(`${prefix}docs/teste.json`, app, documentFactory);

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
