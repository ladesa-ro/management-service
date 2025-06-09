import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { DiarioProfessorService } from "./diario-professor.service";

@Resolver()
export class DiarioProfessorResolver {
  constructor(private diarioProfessorService: DiarioProfessorService) {}
  @Operation(Tokens.DiarioProfessorList)
  async diarioProfessorFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorListOperationInput,
  ) {
    return this.diarioProfessorService.diarioProfessorFindAll(accessContext, dto);
  }
  @Operation(Tokens.DiarioProfessorFindOneById)
  async diarioProfessorFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioProfessorFindOneByIdOperationOutput,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, { id: dto.params.id });
  }
  @Operation(Tokens.DiarioProfessorCreate)
  async diarioProfessorCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorCreateOperationInput,
  ) {
    return this.diarioProfessorService.diarioProfessorCreate(accessContext, dto);
  }
  @Operation(Tokens.DiarioProfessorUpdateOneById)
  async diarioProfessorUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorUpdateByIdOperationInput,
  ) {
    return this.diarioProfessorService.diarioProfessorUpdate(accessContext, dto);
  }
  @Operation(Tokens.DiarioProfessorDeleteOneById)
  async diarioProfessorDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorDeleteByIdOperationInput,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(accessContext, { id: dto.params.id });
  }
}
