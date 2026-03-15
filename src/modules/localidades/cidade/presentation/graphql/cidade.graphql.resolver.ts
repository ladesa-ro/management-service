import { Args, Info, Int, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { Cidade } from "@/modules/localidades/cidade/domain/cidade";
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
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

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

    const listHandler = this.container.get<ICidadeListQueryHandler>(ICidadeListQueryHandler);
    const result = await listHandler.execute(accessContext, input);
    return CidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => CidadeFindOneOutputGraphQlDto, { name: "cidadeFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CidadeFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const findOneHandler = this.container.get<ICidadeFindOneQueryHandler>(
      ICidadeFindOneQueryHandler,
    );
    const result = await findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, Cidade.entityName, id);
    return CidadeGraphqlMapper.toFindOneOutputDto(result);
  }
}
