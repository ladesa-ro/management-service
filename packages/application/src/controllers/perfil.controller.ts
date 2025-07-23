
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { PerfilService } from "@ladesa-ro/management-management-service.domain";
import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("/vinculos")
@ApiTags("perfis")
export class PerfilController {
  constructor(private vinculoService: PerfilService) { }

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Perfils"].get)
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/Perfils"]["get"],
  ) {
    return this.vinculoService.perfilFindAll(accessContext, dto);
  }

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Perfils/{id}"].patch)
  async vinculoSetVinculos(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/Perfils/{id}"]["patch"],
  ) {
    return this.vinculoService.perfilSetVinculos(accessContext, dto);
  }
}
