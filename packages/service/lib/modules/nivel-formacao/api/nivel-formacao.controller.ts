import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { NivelFormacaoService } from "../domain/nivel-formacao.service";

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
    const domain: IDomain.NivelFormacaoFindOneInput & IDomain.NivelFormacaoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.nivelformacaoService.nivelFormacaoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async nivelformacaoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("NivelFormacaoDeleteOneById") dto: IAppRequest<"NivelFormacaoDeleteOneById">) {
    const domain: IDomain.NivelFormacaoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.nivelformacaoService.nivelFormacaoDeleteOneById(accessContext, domain);
  }
}
