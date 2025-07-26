import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { OfertaFormacaoService } from "./oferta-formacao.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@GqlResolver()
export class OfertaFormacaoResolver {
  constructor(
    //
    private ofertaFormacaoService: OfertaFormacaoService,
  ) {}

  //
  
  async ofertaFormacaoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("OfertaFormacaoFindAll") dto: IOperationInput<"OfertaFormacaoFindAll">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  //
  
  async ofertaFormacaoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("OfertaFormacaoFindOneById") dto: IOperationInput<"OfertaFormacaoFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoFindByIdStrict(
      accessContext,
      {
        id: dto.parameters.path.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }

  //
  
  async ofertaFormacaoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("OfertaFormacaoCreate") dto: IOperationInput<"OfertaFormacaoCreate">,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoCreate(accessContext, dto);
  }

  
  async ofertaFormacaoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("OfertaFormacaoUpdate") dto: IOperationInput<"OfertaFormacaoUpdate">,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoUpdate(accessContext, dto);
  }

  
  async ofertaFormacaoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("OfertaFormacaoDeleteOneById") dto: IOperationInput<"OfertaFormacaoDeleteOneById">,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
