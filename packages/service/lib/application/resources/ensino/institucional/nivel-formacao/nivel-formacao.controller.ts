import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type IDomain } from "@/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { NivelFormacaoService } from "./nivel-formacao.service";

@ApiTags("niveis-formacoes")
@Controller("/niveis-formacoes")
export class NivelFormacaoController {
  constructor(private nivelformacaoService: NivelFormacaoService) {}

  @Get("/")
  async nivelformacaoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("NivelFormacaoList") dto: IAppRequest<"NivelFormacaoList">) {
    const domain: IDomain.NivelFormacaoListInput = requestRepresentationMergeToDomain(dto);
    return this.nivelformacaoService.nivelFormacaoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async nivelformacaoFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("NivelFormacaoFindOneById") dto: IAppRequest<"NivelFormacaoFindOneById">) {
    const domain: IDomain.NivelFormacaoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.nivelformacaoService.nivelFormacaoFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async nivelformacaoCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("NivelFormacaoCreate") dto: IAppRequest<"NivelFormacaoCreate">) {
    const domain: IDomain.NivelFormacaoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.nivelformacaoService.nivelFormacaoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async nivelformacaoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("NivelFormacaoUpdateOneById") dto: IAppRequest<"NivelFormacaoUpdateOneById">) {
    const domain: IDomain.NivelFormacaoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.nivelformacaoService.nivelFormacaoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async nivelformacaoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("NivelFormacaoDeleteOneById") dto: IAppRequest<"NivelFormacaoDeleteOneById">) {
    const domain: IDomain.NivelFormacaoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.nivelformacaoService.nivelFormacaoDeleteOneById(accessContext, domain);
  }
}
