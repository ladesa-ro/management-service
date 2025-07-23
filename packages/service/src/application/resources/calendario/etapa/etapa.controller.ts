import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EtapaService } from "./etapa.service";

@ApiTags("etapas")
@Controller("/etapas")
export class EtapaController {
  constructor(private etapaService: EtapaService) {}

  @Get("/")
  @Operation(Tokens.EtapaList)
  async etapaFindAll(@AccessContextHttp() clientAccess: AccessContext, @CombinedInput() dto: LadesaTypings.EtapaListOperationInput): Promise<LadesaTypings.EtapaListOperationOutput["success"]> {
    return this.etapaService.etapaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.EtapaFindOneById)
  async etapaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaFindOneByIdOperationOutput,
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
    @CombinedInput() dto: LadesaTypings.EtapaCreateOperationInput,
  ) {
    return this.etapaService.etapaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.EtapaUpdateOneById)
  async etapaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaUpdateByIdOperationInput,
  ) {
    return this.etapaService.etapaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.EtapaDeleteOneById)
  async etapaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaDeleteByIdOperationInput,
  ) {
    return this.etapaService.etapaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
