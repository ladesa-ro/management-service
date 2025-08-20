import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { CidadeService } from "./cidade.service";

@ApiTags("cidades")
@Controller("/base/cidades")
export class CidadeController {
  constructor(private cidadeService: CidadeService) {}

  // ========================================================

  @Get("/")
  async findAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CidadeList") dto: IAppRequest<"CidadeList">) {
    return this.cidadeService.findAll(accessContext, dto);
  }

  // ========================================================

  @Get("/:id")
  async findById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CidadeFindOneById") dto: IAppRequest<"CidadeFindOneById">) {
    return this.cidadeService.findByIdStrict(accessContext, dto);
  }
}
