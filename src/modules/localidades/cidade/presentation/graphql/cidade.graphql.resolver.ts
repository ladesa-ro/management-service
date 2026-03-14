import { Args, Info, Int, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { Cidade } from "@/modules/localidades/cidade/domain/cidade.domain";
import { ICidadeFindOneQueryHandler } from "@/modules/localidades/cidade/domain/queries/cidade-find-one.query.handler.interface";
import { ICidadeListQueryHandler } from "@/modules/localidades/cidade/domain/queries/cidade-list.query.handler.interface";
import {
  CidadeFindOneOutputGraphQlDto,
  CidadeListInputGraphQlDto,
  CidadeListOutputGraphQlDto,
} from "./cidade.graphql.dto";
import { CidadeGraphqlMapper } from "./cidade.graphql.mapper";

@Resolver(() => CidadeFindOneOutputGraphQlDto)
export class CidadeGraphqlResolver {
  constructor(
    @DeclareDependency(ICidadeListQueryHandler)
    private readonly listHandler: ICidadeListQueryHandler,
    @DeclareDependency(ICidadeFindOneQueryHandler)
    private readonly findOneHandler: ICidadeFindOneQueryHandler,
  ) {}

  @Query(() => CidadeListOutputGraphQlDto, { name: "cidadeFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: CidadeListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CidadeListOutputGraphQlDto> {
    const input = CidadeGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.listHandler.execute({ accessContext, dto: input });
    return CidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => CidadeFindOneOutputGraphQlDto, { name: "cidadeFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CidadeFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, Cidade.entityName, id);
    return CidadeGraphqlMapper.toFindOneOutputDto(result);
  }
}
