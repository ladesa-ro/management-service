import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { DiaCalendarioService } from "./dia-calendario.service";

@Resolver()
export class DiaCalendarioResolver {
  constructor(private diaCalendarioService: DiaCalendarioService) {}
  //
  @Operation(Tokens.DiaCalendarioList)
  async diaCalendarioFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioListOperationInput,
  ) {
    return this.diaCalendarioService.diaCalendarioFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.DiaCalendarioFindOneById)
  async diaCalendarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioFindOneByIdOperationOutput,
  ) {
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(Tokens.DiaCalendarioCreate)
  async diaCalendarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioCreateOperationInput,
  ) {
    return this.diaCalendarioService.diaCalendarioCreate(accessContext, dto);
  }
  //
  @Operation(Tokens.DiaCalendarioUpdateOneById)
  async diaCalendarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioUpdateByIdOperationInput,
  ) {
    return this.diaCalendarioService.diaCalendarioUpdate(accessContext, dto);
  }
  //
  @Operation(Tokens.DiaCalendarioDeleteOneById)
  async diaCalendarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioDeleteByIdOperationInput,
  ) {
    return this.diaCalendarioService.diaCalendarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
