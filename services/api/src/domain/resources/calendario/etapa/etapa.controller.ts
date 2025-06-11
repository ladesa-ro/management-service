import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type * as IDomainContracts from "~domain.contracts";
import { EtapaService } from "./etapa.service";

@ApiTags("etapas")
@Controller("/etapas")
export class EtapaController {
  constructor(private etapaService: EtapaService) {}

  @Get("/")
  @Operation(Tokens.EtapaList)
  async etapaFindAll(@AccessContextHttp() clientAccess: AccessContext, @CombinedInput() dto: IDomainContracts.EtapaListOperationInput): Promise<IDomainContracts.EtapaListOperationOutput["success"]> {
    return this.etapaService.etapaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.EtapaFindOneById)
  async etapaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.EtapaFindOneByIdOperationOutput,
  ) {
    return this.etapaService.etapaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.EtapaCreate)
  async etapaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.EtapaCreateOperationInput,
  ) {
    return this.etapaService.etapaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.EtapaUpdateOneById)
  async etapaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.EtapaUpdateByIdOperationInput,
  ) {
    return this.etapaService.etapaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.EtapaDeleteOneById)
  async etapaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.EtapaDeleteByIdOperationInput,
  ) {
    return this.etapaService.etapaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
