
import { type AccessContext, AccessContextHttp } from "@/access-context";
import { HorarioGeradoService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiDocSchema, ApiDocTypings } from "../helpers/documentacao/openapi";
import { RotaDocumentada } from "../helpers/rota-documentada";
import { RotaInputs } from "../helpers/rota-inputs";

@ApiTags("horarios-gerados")
@Controller("/horarios-gerados")
export class HorarioGeradoController {
  constructor(private horarioGeradoService: HorarioGeradoService) { }

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/HorarioGerados"].get)
  async horarioGeradoFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/HorarioGerados"]["get"],
  ): Promise<IDomainContracts.HorarioGeradoListOperationOutput["success"]> {
    return this.horarioGeradoService.horarioGeradoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/HorarioGerados/{id}"].get)
  async horarioGeradoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() dto: IDomainContracts.HorarioGeradoFindByIdOperationOutput,
  ) {
    return this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/HorarioGerados"].post)
  async horarioGeradoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/HorarioGerados"]["post"],
  ) {
    return this.horarioGeradoService.horarioGeradoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/HorarioGerados/{id}"].patch)
  async horarioGeradoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/HorarioGerados/{id}"]["patch"],
  ) {
    return this.horarioGeradoService.horarioGeradoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/HorarioGerados/{id}"].delete)
  async horarioGeradoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/HorarioGerados/{id}"]["delete"],
  ) {
    return this.horarioGeradoService.horarioGeradoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
