import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiDocSchema } from "../helpers/documentacao/openapi";
import { RotaDocumentada } from "../helpers/rota-documentada";
import { AppService } from "../services/app.service";

@ApiTags("base")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @RotaDocumentada(ApiDocSchema.paths["/api/v1"].get)
  getHello() {
    return this.appService.getHello();
  }
}
