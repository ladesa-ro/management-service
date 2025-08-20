import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppRequest, IDomain, requestRepresentationMergeToDomain } from "@/shared";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { CidadeService } from "../domain/cidade.service";

@ApiTags("cidades")
@Controller("/base/cidades")
export class CidadeController {
  constructor(private cidadeService: CidadeService) {}

  // ========================================================

  @Get("/")
  async findAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CidadeList") dto: IAppRequest<"CidadeList">) {
    const domain: IDomain.CidadeListInput = requestRepresentationMergeToDomain(dto);
    return this.cidadeService.findAll(accessContext, domain);
  }

  // ========================================================

  @Get("/:id")
  async findById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CidadeFindOneById") dto: IAppRequest<"CidadeFindOneById">) {
    const domain: IDomain.CidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.cidadeService.findByIdStrict(accessContext, domain);
  }
}
