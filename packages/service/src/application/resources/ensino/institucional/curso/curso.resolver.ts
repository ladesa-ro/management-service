import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { CursoService } from "./curso.service";

@Resolver()
export class CursoResolver {
  constructor(
    //
    private cursoService: CursoService,
  ) {}
  //
  @Operation(Tokens.CursoList)
  async cursoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoListOperationInput,
  ) {
    return this.cursoService.cursoFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.CursoFindOneById)
  async cursoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoFindOneByIdOperationOutput,
  ) {
    return this.cursoService.cursoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(Tokens.CursoCreate)
  async cursoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoCreateOperationInput,
  ) {
    return this.cursoService.cursoCreate(accessContext, dto);
  }
  @Operation(Tokens.CursoUpdateOneById)
  async cursoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoUpdateByIdOperationInput,
  ) {
    return this.cursoService.cursoUpdate(accessContext, dto);
  }
  @Operation(Tokens.CursoDeleteOneById)
  async cursoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoDeleteByIdOperationInput,
  ) {
    return this.cursoService.cursoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
