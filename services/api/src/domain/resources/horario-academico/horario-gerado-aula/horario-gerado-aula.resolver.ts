import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { HorarioGeradoAulaService } from "./horario-gerado-aula.service";

@Resolver()
export class HorarioGeradoAulaResolver {
  constructor(private horarioGeradoAulaService: HorarioGeradoAulaService) {}
  //
  @Operation(Tokens.HorarioGeradoAulaList)
  async horarioGeradoAulaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaListOperationInput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.HorarioGeradoAulaFindOneById)
  async horarioGeradoAulaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaFindByIdOperationOutput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(Tokens.HorarioGeradoAulaCreate)
  async horarioGeradoAulaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaCreateOperationInput,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaCreate(accessContext, dto);
  }
  //
  @Operation(Tokens.HorarioGeradoAulaUpdateOneById)
  async horarioGeradoAulaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.HorarioGeradoAulaUpdateByIdOperationInput,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaUpdate(accessContext, dto);
  }
  //
  @Operation(Tokens.HorarioGeradoAulaDeleteOneById)
  async horarioGeradoAulaOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.HorarioGeradoAulaDeleteByIdOperationInput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaDeleteOneById(accessContext, { id: dto.params.id });
  }
}
