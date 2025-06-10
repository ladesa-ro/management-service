import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { ReservaService } from "./reserva.service";

@Resolver()
export class ReservaResolver {
  constructor(
    //
    private reservaService: ReservaService,
  ) {}
  //
  @Operation(Tokens.ReservaList)
  async reservaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaListOperationInput,
  ) {
    return this.reservaService.reservaFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.ReservaFindOneById)
  async reservaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaFindOneByIdOperationOutput,
  ) {
    return this.reservaService.reservaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(Tokens.ReservaCreate)
  async reservaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaCreateOperationInput,
  ) {
    return this.reservaService.reservaCreate(accessContext, dto);
  }
  @Operation(Tokens.ReservaUpdateOneById)
  async reservaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaUpdateByIdOperationInput,
  ) {
    return this.reservaService.reservaUpdate(accessContext, dto);
  }
  @Operation(Tokens.ReservaDeleteOneById)
  async reservaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaDeleteByIdOperationInput,
  ) {
    return this.reservaService.reservaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
