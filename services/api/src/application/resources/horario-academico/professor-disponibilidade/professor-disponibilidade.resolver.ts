import { CombinedInput, graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { ProfessorDisponibilidadeService } from "./professor-disponibilidade.service";

@GqlResolver()
export class ProfessorDisponibilidadeResolver {
  constructor(
    //
    private professorDisponibilidadeService: ProfessorDisponibilidadeService,
  ) {}
  //
  @Operation(Tokens.ProfessorDisponibilidadeList)
  async professorDisponibilidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.ProfessorDisponibilidadeListOperationInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }
  //
  @Operation(Tokens.ProfessorDisponibilidadeFindOneById)
  async professorDisponibilidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.ProfessorDisponibilidadeFindOneByIdOperationOutput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindByIdStrict(
      accessContext,
      {
        id: dto.params.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }
  //
  @Operation(Tokens.ProfessorDisponibilidadeCreate)
  async professorDisponibilidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.ProfessorDisponibilidadeCreateOperationInput,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeCreate(accessContext, dto);
  }

  @Operation(Tokens.ProfessorDisponibilidadeUpdateOneById)
  async professorDisponibilidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.ProfessorDisponibilidadeUpdateByIdOperationInput,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeUpdate(accessContext, dto);
  }

  @Operation(Tokens.ProfessorDisponibilidadeDeleteOneById)
  async professorDisponibilidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.ProfessorDisponibilidadeDeleteByIdOperationInput,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
