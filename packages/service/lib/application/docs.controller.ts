import { Controller, Get, Inject, Req } from "@nestjs/common";
import type { Request } from "express";
import { AppApiDocAny } from "@/application/contracts/openapi/document/app-openapi-document";
import { AppConfigService } from "@/infrastructure/config";

@Controller("/docs")
export class DocsController {
  constructor(
    @Inject(AppConfigService)
    readonly configService: AppConfigService,
  ) {}

  private getCurrentApiUrl() {
    return this.configService.withRuntimePrefix("/docs/openapi.v3.json");
  }

  private getCurrentApiPath(req: Request) {
    const protocol = req.protocol;
    const host = req.get("host");

    // Obter o prefixo da API do serviço de configuração
    const prefix = this.configService.getRuntimePrefix();

    // Construir a URL do servidor com o prefixo da API
    return `${protocol}://${host}${prefix}`;
  }

  @Get("openapi.v3.json")
  getOpenApiSpec(@Req() req: Request) {
    const serverUrl = this.getCurrentApiPath(req);

    return {
      ...AppApiDocAny,
      servers: [
        {
          url: serverUrl,
          description: "Servidor Atual",
        },
      ],
    };
  }

  @Get("/swagger")
  getSwaggerDocs() {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="SwaggerUI" />
        <title>SwaggerUI</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
      </head>
      <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js" crossorigin></script>
      <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js" crossorigin></script>
      <script>
        window.onload = () => {
          window.ui = SwaggerUIBundle({
            url: '${this.getCurrentApiUrl()}',
            dom_id: '#swagger-ui',
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            layout: "BaseLayout",
          });
        };
      </script>
      </body>
    </html>
    `;
  }

  @Get("/")
  getScalarDocs() {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Scalar API Reference</title>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1" />
      </head>
    
      <body>
        <div id="app"></div>
    
        <!-- Load the Script -->
        <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
    
        <!-- Initialize the Scalar API Reference -->
        <script>
          Scalar.createApiReference('#app', {
            url: '${this.getCurrentApiUrl()}',
          })
        </script>
      </body>
    </html>
    `;
  }
}
