
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { CidadeService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RotaInputs } from "../helpers/rota-inputs";

@ApiTags("cidades")
@Controller("/base/cidades")
export class CidadeController {
  constructor(private cidadeService: CidadeService) { }

  // ========================================================

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Cidades"].get)
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/cidades"]["get"],
  ): Promise<IDomainContracts.CidadeListOperationOutput["success"]> {
    return this.cidadeService.findAll(accessContext, dto);
  }

  // ========================================================

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Cidades/{id}"].get)
  async findById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/cidades/{id}"]["get"],
  ): Promise<IDomainContracts.CidadeFindOneResultView> {
    return this.cidadeService.findByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
}
