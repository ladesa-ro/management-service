
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { EstadoService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("estados")
@Controller("/base/estados")
export class EstadoController {
  constructor(private estadoService: EstadoService) { }

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Estados"].get)
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/estados"]["get"],
  ): Promise<IDomainContracts.EstadoListOperationOutput["success"]> {
    return this.estadoService.findAll(accessContext, dto);
  }

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Estados/{id}"].get)
  async findById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/estados/{id}"]["get"],
  ) {
    return this.estadoService.findByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
}
