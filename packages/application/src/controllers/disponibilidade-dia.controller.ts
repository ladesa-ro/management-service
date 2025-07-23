
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { DisponibilidadeDiaService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("diarios-preferencia-agrupamento")
@Controller("/diarios-preferencia-agrupamento")
export class DisponibilidadeDiaController {
  constructor(private disponibilidadeDiaService: DisponibilidadeDiaService) { }

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/DisponibilidadeDias"].get)
  async disponibilidadeDiaFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.DisponibilidadeDiaListInput,
  ): Promise<IDomainContracts.DisponibilidadeDiaListOperationOutput["success"]> {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/DisponibilidadeDias/{id}"].get)
  async disponibilidadeDiaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.DisponibilidadeDiaFindOneByIdOperationOutput,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/DisponibilidadeDias"].post)
  async disponibilidadeDiaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.DisponibilidadeDiaCreateInput,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/DisponibilidadeDias/{id}"].patch)
  async disponibilidadeDiaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.DisponibilidadeDiaUpdateInput,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/DisponibilidadeDias/{id}"].delete)
  async disponibilidadeDiaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.DisponibilidadeDiaDeleteByIdInput,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
