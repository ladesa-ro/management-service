import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import swaggerUi from "swagger-ui-express";
import { CONFIG_PORT, type IConfigPort } from "@/modules/@shared/application/ports/out/config";
import type express from "express";

export const useDocs = (app: INestApplication) => {
  const configService = app.get<IConfigPort>(CONFIG_PORT);

  const prefix = configService.getRuntimePrefix();

  const paths = {
    openapi: `${prefix}docs/openapi.v3.json`,
    swagger: `${prefix}docs/swagger`,
    scalar: `${prefix}docs`,
  };

  const configBuilder = new DocumentBuilder()
    .setTitle("Ladesa Management Service API")
    .setDescription("API de gerenciamento do sistema Ladesa")
    .setVersion("1.0")
    .addBearerAuth();

  const config = configBuilder.build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });

  const server = app.getHttpAdapter().getInstance();

  /**
   * OPENAPI JSON
   */
  server.get(paths.openapi, (req: express.Request, res: express.Response) => {
    const protocol = req.get('x-forwarded-proto') || req.protocol || 'http';
    const host = req.get('x-forwarded-host') || req.get('host');

    const baseUrl = `${protocol}://${host}${prefix}`;

    const dynamicDocument = {
      ...document,
      servers: [
        {
          url: baseUrl,
          description: 'Servidor atual (gerado dinamicamente)',
        },
      ],
    };

    res.type('application/json').send(dynamicDocument);
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
