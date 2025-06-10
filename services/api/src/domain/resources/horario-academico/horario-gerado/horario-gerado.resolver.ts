import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { HorarioGeradoService } from "./horario-gerado.service";

@Resolver()
export class HorarioGeradoResolver {
  constructor(private horarioGeradoService: HorarioGeradoService) {}
  //
  @Operation(Tokens.HorarioGeradoList)
  async horarioGeradoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoListOperationInput,
  ) {
    return this.horarioGeradoService.horarioGeradoFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.HorarioGeradoFindOneById)
  async horarioGeradoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoFindByIdOperationInput,
  ) {
    return this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(Tokens.HorarioGeradoCreate)
  async horarioGeradoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoCreateOperationInput,
  ) {
    return this.horarioGeradoService.horarioGeradoCreate(accessContext, dto);
  }
  //
  @Operation(Tokens.HorarioGeradoUpdateOneById)
  async horarioGeradoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoUpdateByIdOperationInput,
  ) {
    return this.horarioGeradoService.horarioGeradoUpdate(accessContext, dto);
  }
  //
  @Operation(Tokens.HorarioGeradoDeleteOneById)
  async horarioGeradoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoDeleteByIdOperationInput,
  ) {
    return this.horarioGeradoService.horarioGeradoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
