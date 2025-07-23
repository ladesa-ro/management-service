import { CombinedInput, graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { ModalidadeService } from "./modalidade.service";

@GqlResolver()
export class ModalidadeResolver {
  constructor(
    //
    private modalidadeService: ModalidadeService,
  ) {}
  //
  @Operation(Tokens.ModalidadeList)
  async modalidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeListOperationInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }
  //
  @Operation(Tokens.ModalidadeFindOneById)
  async modalidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeFindOneByIdOperationOutput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(accessContext, { id: dto.params.id }, ["id", ...graphqlExtractSelection(info)]);
  }
  //
  @Operation(Tokens.ModalidadeCreate)
  async modalidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeCreateOperationInput,
  ) {
    return this.modalidadeService.modalidadeCreate(accessContext, dto);
  }
  @Operation(Tokens.ModalidadeUpdateOneById)
  async modalidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeUpdateByIdOperationInput,
  ) {
    return this.modalidadeService.modalidadeUpdate(accessContext, dto);
  }
  @Operation(Tokens.ModalidadeDeleteOneById)
  async modalidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeDeleteByIdOperationInput,
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
