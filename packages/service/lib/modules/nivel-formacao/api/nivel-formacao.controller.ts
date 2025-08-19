import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts/generic-adapters";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { NivelFormacaoService } from "./domain/nivel-formacao.service";

@ApiTags("niveis-formacoes")
@Controller("/niveis-formacoes")
export class NivelFormacaoController {
  constructor(private nivelformacaoService: NivelFormacaoService) {
  }

  @Get("/")
  async nivelformacaoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("NivelformacaoList") dto: IAppRequest<"NivelformacaoList">) {
    const domain: IDomain.NivelformacaoListInput = requestRepresentationMergeToDomain(dto);
    return this.nivelformacaoService.nivelFormacaoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async nivelformacaoFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("NivelformacaoFindById") dto: IAppRequest<"NivelformacaoFindOneById">) {
    const domain: IDomain.NivelformacaoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.nivelformacaoService.nivelFormacaoFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async nivelformacaoCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("NivelformacaoCreate") dto: IAppRequest<"NivelformacaoCreate">) {
    const domain: IDomain.NivelformacaoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.nivelformacaoService.nivelformacaoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async nivelformacaoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("NivelformacaoUpdate") dto: IAppRequest<"NivelformacaoUpdateOneById">) {
    const domain: IDomain.NivelformacaoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.nivelformacaoService.nivelformacaoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async nivelformacaoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("NivelformacaoDeleteOneById") dto: IAppRequest<"NivelformacaoDeleteOneById">) {
    const domain: IDomain.NivelformacaoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.nivelformacaoService.nivelformacaoDeleteOneById(accessContext, domain);
  }
}
