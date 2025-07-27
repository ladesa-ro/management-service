import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { PerfilService } from "./perfil.service";

@Controller("/vinculos")
@ApiTags("perfis")
export class PerfilController {
  constructor(private vinculoService: PerfilService) {}

  @Get("/")
  async findAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("FindAll") dto: IAppRequest<"FindAll">) {
    const domain: IDomain.VinculoListInput = requestRepresentationMergeToDomain(dto);
    return this.vinculoService.perfilFindAll(accessContext, domain);
  }

  @Post("/")
  async vinculoSetVinculos(@AccessContextHttp() accessContext: AccessContext, @AppRequest("VinculoSetVinculos") dto: IAppRequest<"VinculoSetVinculos">) {
    return this.vinculoService.perfilSetVinculos(accessContext, dto);
  }
}
