import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { ModalidadeService } from "./modalidade.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@GqlResolver()
export class ModalidadeResolver {
  constructor(
    //
    private modalidadeService: ModalidadeService,
  ) {}

  //
  
  async modalidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeFindAll") dto: IApiDoc.operations["ModalidadeFindAll"],
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  //
  
  async modalidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeFindOneById") dto: IApiDoc.operations["ModalidadeFindOneById"],
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(accessContext, { id: dto.params.id }, ["id", ...graphqlExtractSelection(info)]);
  }

  //
  
  async modalidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeCreate") dto: IApiDoc.operations["ModalidadeCreate"],
  ) {
    return this.modalidadeService.modalidadeCreate(accessContext, dto);
  }

  
  async modalidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeUpdate") dto: IApiDoc.operations["ModalidadeUpdate"],
  ) {
    return this.modalidadeService.modalidadeUpdate(accessContext, dto);
  }

  
  async modalidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeDeleteOneById") dto: IApiDoc.operations["ModalidadeDeleteOneById"],
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
