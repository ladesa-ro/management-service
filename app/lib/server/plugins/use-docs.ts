import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import swaggerUi from "swagger-ui-express";
import { CONFIG_PORT, type IConfigPort } from "@/modules/@shared/application/ports/out/config";
import { withPrefix } from "@/v2/old/infrastructure/utils/withPrefix";

export const useDocs = (app: INestApplication) => {
  const configService = app.get<IConfigPort>(CONFIG_PORT);

  const prefix = configService.getRuntimePrefix();

  const paths = {
    openapi: withPrefix(prefix, "docs/openapi.v3.json"),
    swagger: withPrefix(prefix, "docs/swagger"),
    scalar: withPrefix(prefix, "docs"),
  };

  const config = new DocumentBuilder()
    .setTitle("Ladesa Management Service API")
    .setDescription("API de gerenciamento do sistema Ladesa")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });

  const server = app.getHttpAdapter().getInstance();

  /**
   * OPENAPI JSON
   */
  server.get(paths.openapi, (_req, res) => {
    res.type("application/json").send(document);
  });

  /**
   * SWAGGER UI (Express)
   */
  server.use(
    paths.swagger,
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: paths.openapi,
      },
    }),
  );

  /**
   * SCALAR (Express)
   */
  server.use(
    paths.scalar,
    apiReference({
      url: paths.openapi,
    }),
  );
};
