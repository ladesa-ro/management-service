import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { EtapaService } from "./etapa.service";

@Resolver()
export class EtapaResolver {
  constructor(private etapaService: EtapaService) {}
  //
  @Operation(Tokens.EtapaList)
  async etapaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaListOperationInput,
  ) {
    return this.etapaService.etapaFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.EtapaFindOneById)
  async etapaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaFindOneByIdOperationOutput,
  ) {
    return this.etapaService.etapaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(Tokens.EtapaCreate)
  async etapaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaCreateOperationInput,
  ) {
    return this.etapaService.etapaCreate(accessContext, dto);
  }
  //
  @Operation(Tokens.EtapaUpdateOneById)
  async etapaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaUpdateByIdOperationInput,
  ) {
    return this.etapaService.etapaUpdate(accessContext, dto);
  }
  //
  @Operation(Tokens.EtapaDeleteOneById)
  async etapaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaDeleteByIdOperationInput,
  ) {
    return this.etapaService.etapaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
