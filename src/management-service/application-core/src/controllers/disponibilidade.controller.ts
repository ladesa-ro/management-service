
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { DisponibilidadeService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiDocSchema, ApiDocTypings } from "../helpers/documentacao/openapi";
import { RotaDocumentada } from "../helpers/rota-documentada";
import { RotaInputs } from "../helpers/rota-inputs";

@ApiTags("disponibilidades")
@Controller("/disponibilidades")
export class DisponibilidadeController {
  constructor(private disponibilidadeService: DisponibilidadeService) { }

  //

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Disponibilidades"].get)
  async disponibilidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/disponibilidades"]["get"],
  ): Promise<IDomainContracts.DisponibilidadeListOperationOutput["success"]> {
    return this.disponibilidadeService.disponibilidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Disponibilidades/{id}"].get)
  async disponibilidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.DisponibilidadeFindOneByIdOperationOutput,
  ) {
    return this.disponibilidadeService.disponibilidadeFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Disponibilidades"].post)
  async disponibilidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/disponibilidades"]["post"],
  ) {
    return this.disponibilidadeService.disponibilidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Disponibilidades/{id}"].patch)
  async disponibilidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/disponibilidades/{id}"]["patch"],
  ) {
    return this.disponibilidadeService.disponibilidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Disponibilidades/{id}"].delete)
  async disponibilidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/disponibilidades/{id}"]["delete"],
  ) {
    return this.disponibilidadeService.disponibilidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
