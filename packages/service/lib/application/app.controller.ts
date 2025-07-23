import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("base")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: "Olá, Mundo!",
    schema: {
      type: "object",
      properties: {
        service: {
          type: "string",
          enum: ["@ladesa-ro/api.service"],
          description: "O nome desta aplicação.",
        },
        status: {
          type: "string",
          enum: ["up"],
          description: "Status desta aplicação.",
        },
        prefix: {
          description: "Prefixo do serviço API.",
          oneOf: [{ type: "string" }, { type: "null" }],
        },
        version: {
          description: "Versão do serviço API.",
          oneOf: [{ type: "string" }],
        },
        buildTime: {
          description: "Horário do build da aplicação.",
          oneOf: [{ type: "string", format: "date-time" }],
        },
        gitCommitHash: {
          description: "Hash atrelado ao commit git no horário do build da aplicação.",
          oneOf: [{ type: "string" }, { type: "null" }],
        },
      },
      required: ["service", "status", "version"],
    },
  })
  getHello() {
    return this.appService.getHello();
  }
}
