import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts/generic-adapters";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { PerfilService } from "./domain/perfil.service";

@Controller("/perfis")
@ApiTags("perfis")
export class PerfilController {
  constructor(private vinculoService: PerfilService) {
  }

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
  async setVinculos(@AccessContextHttp() accessContext: AccessContext, @AppRequest("PerfilUpdateInput") dto: IAppRequest<"PerfilUpdateOneById">) {
    const domain: IDomain.PerfilUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.vinculoService.perfilSetVinculos(accessContext, domain);
  }
}
