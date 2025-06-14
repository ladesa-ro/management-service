
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { CalendarioLetivoService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiDocSchema, ApiDocTypings } from "../helpers/documentacao/openapi";
import { RotaDocumentada } from "../helpers/rota-documentada";
import { RotaInputs } from "../helpers/rota-inputs";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) { }

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/CalendarioLetivos"].get)
  async calendarioFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/calendarios-letivos"]["get"],
  ): Promise<IDomainContracts.CalendarioLetivoListOperationOutput["success"]> {
    return this.calendarioLetivoService.calendarioLetivoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/CalendarioLetivos/{id}"].get)
  async calendarioLetivoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.CalendarioLetivoFindOneByIdOperationOutput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/CalendarioLetivos"].post)
  async campusCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/calendarios-letivos"]["post"],
  ) {
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/CalendarioLetivos/{id}"].patch)
  async calendarioLetivoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/calendarios-letivos/{id}"]["patch"],
  ) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/CalendarioLetivos/{id}"].delete)
  async CalendarioLetivoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/calendarios-letivos/{id}"]["delete"],
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
