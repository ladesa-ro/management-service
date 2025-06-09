import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { DisciplinaService } from "./disciplina.service";

@Resolver()
export class DisciplinaResolver {
  constructor(
    //
    private disciplinaService: DisciplinaService,
  ) {}
  //
  @Operation(Tokens.DisciplinaList)
  async disciplinaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaListOperationInput,
  ) {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.DisciplinaFindOneById)
  async disciplinaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaFindOneByIdOperationOutput,
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(Tokens.DisciplinaCreate)
  async disciplinaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaCreateOperationInput,
  ) {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }
  @Operation(Tokens.DisciplinaUpdateOneById)
  async disciplinaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaUpdateByIdOperationInput,
  ) {
    return this.disciplinaService.disciplinaUpdate(accessContext, dto);
  }
  @Operation(Tokens.DisciplinaDeleteOneById)
  async disciplinaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaDeleteByIdOperationInput,
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
