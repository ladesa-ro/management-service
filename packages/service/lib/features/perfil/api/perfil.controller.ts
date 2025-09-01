import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure-antigo/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared-antigo";
import { type IAppRequest } from "@/shared-antigo/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared-antigo/tsp/schema/typings";
import { PerfilService } from "../domain/perfil.service";

@Controller("/perfis")
@ApiTags("perfis")
export class PerfilController {
  constructor(private vinculoService: PerfilService) {}

  @Get("/:id/ensino")
  async perfilEnsinoById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("PerfilEnsinoById") dto: IAppRequest<"PerfilEnsinoById">) {
    const domain: IDomain.PerfilFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.vinculoService.perfilEnsinoById(accessContext, domain);
  }

  @Get("/")
  async findAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("PerfilList") dto: IAppRequest<"PerfilList">) {
    const domain: IDomain.PerfilListInput = requestRepresentationMergeToDomain(dto);
    return this.vinculoService.perfilFindAll(accessContext, domain);
  }

  @Post("/")
  async setVinculos(@AccessContextHttp() accessContext: AccessContext, @AppRequest("PerfilUpdateOneById") dto: IAppRequest<"PerfilUpdateOneById">) {
    const domain: IDomain.PerfilFindOneInput & IDomain.PerfilUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.vinculoService.perfilSetVinculos(accessContext, domain);
  }
}
