import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { TurmaService } from "./turma.service";

@Resolver()
export class TurmaResolver {
  constructor(
    //
    private turmaService: TurmaService,
  ) {}
  //
  @Operation(Tokens.TurmaList)
  async turmaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaListOperationInput,
  ) {
    return this.turmaService.turmaFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.TurmaFindOneById)
  async turmaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaFindOneByIdOperationOutput,
  ) {
    return this.turmaService.turmaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(Tokens.TurmaCreate)
  async turmaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaCreateOperationInput,
  ) {
    return this.turmaService.turmaCreate(accessContext, dto);
  }
  @Operation(Tokens.TurmaUpdateOneById)
  async turmaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaUpdateByIdOperationInput,
  ) {
    return this.turmaService.turmaUpdate(accessContext, dto);
  }
  @Operation(Tokens.TurmaDeleteOneById)
  async turmaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaFindOneByIdOperationOutput,
  ) {
    return this.turmaService.turmaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
