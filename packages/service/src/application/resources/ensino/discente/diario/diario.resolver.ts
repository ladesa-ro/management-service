import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { DiarioService } from "./diario.service";

@Resolver()
export class DiarioResolver {
  constructor(
    //
    private diarioService: DiarioService,
  ) {}
  //
  @Operation(Tokens.DiarioList)
  async diarioFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioListOperationInput,
  ) {
    return this.diarioService.diarioFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.DiarioFindOneById)
  async diarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioFindOneByIdOperationOutput,
  ) {
    return this.diarioService.diarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(Tokens.DiarioCreate)
  async diarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioCreateOperationInput,
  ) {
    return this.diarioService.diarioCreate(accessContext, dto);
  }
  @Operation(Tokens.DiarioUpdateOneById)
  async diarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioUpdateByIdOperationInput,
  ) {
    return this.diarioService.diarioUpdate(accessContext, dto);
  }
  @Operation(Tokens.DiarioDeleteOneById)
  async diarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioDeleteByIdOperationInput,
  ) {
    return this.diarioService.diarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
