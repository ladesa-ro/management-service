import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import swaggerUi from "swagger-ui-express";
import { withPrefix } from "@/infrastructure/utils/withPrefix";
import { AppConfigService } from "@/v2/infra/config";

export const useDocs = (app: INestApplication) => {
  const configService = app.get<AppConfigService>(AppConfigService);

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

  const document = SwaggerModule.createDocument(app, config);

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
