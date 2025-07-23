import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { BlocoService } from "./bloco.service";

@Resolver()
export class BlocoResolver {
  constructor(
    //
    private blocoService: BlocoService,
  ) {}

  //

  @Operation(Tokens.BlocoList)
  async blocoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.BlocoListOperationInput,
  ) {
    return this.blocoService.blocoFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.BlocoFindOneById)
  async blocoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.BlocoFindOneByIdOperationOutput,
  ) {
    return this.blocoService.blocoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(Tokens.BlocoCreate)
  async blocoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.BlocoCreateOperationInput,
  ) {
    return this.blocoService.blocoCreate(accessContext, dto);
  }
  @Operation(Tokens.BlocoUpdateOneById)
  async blocoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.BlocoUpdateByIdOperationInput,
  ) {
    return this.blocoService.blocoUpdate(accessContext, dto);
  }
  @Operation(Tokens.BlocoDeleteOneById)
  async blocoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.BlocoDeleteByIdOperationInput,
  ) {
    return this.blocoService.blocoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
