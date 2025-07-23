import { CombinedInput, graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { DisponibilidadeService } from "./disponibilidade.service";

@GqlResolver()
export class DisponibilidadeResolver {
  constructor(
    //
    private disponibilidadeService: DisponibilidadeService,
  ) {}
  //
  @Operation(Tokens.DisponibilidadeList)
  async disponibilidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisponibilidadeListOperationInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.disponibilidadeService.disponibilidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }
  //
  @Operation(Tokens.DisponibilidadeFindOneById)
  async disponibilidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeFindOneByIdOperationOutput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.disponibilidadeService.disponibilidadeFindByIdStrict(accessContext, { id: dto.params.id }, ["id", ...graphqlExtractSelection(info)]);
  }
  //
  @Operation(Tokens.DisponibilidadeCreate)
  async disponibilidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisponibilidadeCreateOperationInput,
  ) {
    return this.disponibilidadeService.disponibilidadeCreate(accessContext, dto);
  }
  @Operation(Tokens.DisponibilidadeUpdateOneById)
  async disponibilidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisponibilidadeUpdateByIdOperationInput,
  ) {
    return this.disponibilidadeService.disponibilidadeUpdate(accessContext, dto);
  }
  @Operation(Tokens.DisponibilidadeDeleteOneById)
  async disponibilidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisponibilidadeDeleteByIdOperationInput,
  ) {
    return this.disponibilidadeService.disponibilidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
