import { NestFactory } from "@nestjs/core";
import { OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "../../../application/app.module";
import { SetupSwaggerDocument } from "../../../infrastructure/integrations";
import { OptionsBuilder } from "../typings/options";

export async function buildOpenApiDocument(options: OptionsBuilder): Promise<OpenAPIObject> {
  const app = await NestFactory.create(AppModule, {
    preview: true,
    logger: false,
    abortOnError: false,
  });

  if (options.apiPrefix) {
    app.setGlobalPrefix(options.apiPrefix.path, {
      exclude: options.apiPrefix.exclude,
    });
  }

  const config = SetupSwaggerDocument();
  const document = SwaggerModule.createDocument(app, config.build());

  await app.close();

  return document;
}
