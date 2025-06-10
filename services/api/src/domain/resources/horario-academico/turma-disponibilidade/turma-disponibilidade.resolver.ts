import { CombinedInput, graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";

@GqlResolver()
export class TurmaDisponibilidadeResolver {
  constructor(
    //
    private turmaDisponibilidadeService: TurmaDisponibilidadeService,
  ) {}
  //
  @Operation(Tokens.TurmaDisponibilidadeList)
  async turmaDisponibilidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeListOperationInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }
  //
  @Operation(Tokens.TurmaDisponibilidadeFindOneById)
  async turmaDisponibilidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeFindOneByIdOperationOutput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdStrict(
      accessContext,
      {
        id: dto.params.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }
  //
  @Operation(Tokens.TurmaDisponibilidadeCreate)
  async turmaDisponibilidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeCreateOperationInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, dto);
  }

  @Operation(Tokens.TurmaDisponibilidadeUpdateOneById)
  async turmaDisponibilidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeUpdateByIdOperationInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeUpdate(accessContext, dto);
  }

  @Operation(Tokens.TurmaDisponibilidadeDeleteOneById)
  async turmaDisponibilidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeDeleteByIdOperationInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
