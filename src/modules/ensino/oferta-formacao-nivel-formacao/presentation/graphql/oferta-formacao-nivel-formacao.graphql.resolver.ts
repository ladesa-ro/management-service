import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IOfertaFormacaoNivelFormacaoCreateCommandHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-create.command.handler.interface";
import { IOfertaFormacaoNivelFormacaoDeleteCommandHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-delete.command.handler.interface";
import { IOfertaFormacaoNivelFormacaoUpdateCommandHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-update.command.handler.interface";
import { OfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/oferta-formacao-nivel-formacao";
import { IOfertaFormacaoNivelFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/queries/oferta-formacao-nivel-formacao-find-one.query.handler.interface";
import { IOfertaFormacaoNivelFormacaoListQueryHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/queries/oferta-formacao-nivel-formacao-list.query.handler.interface";
import {
  OfertaFormacaoNivelFormacaoCreateInputGraphQlDto,
  OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto,
  OfertaFormacaoNivelFormacaoListInputGraphQlDto,
  OfertaFormacaoNivelFormacaoListOutputGraphQlDto,
  OfertaFormacaoNivelFormacaoUpdateInputGraphQlDto,
} from "./oferta-formacao-nivel-formacao.graphql.dto";
import { OfertaFormacaoNivelFormacaoGraphqlMapper } from "./oferta-formacao-nivel-formacao.graphql.mapper";

@Resolver(() => OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto)
export class OfertaFormacaoNivelFormacaoGraphqlResolver {
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  @Query(() => OfertaFormacaoNivelFormacaoListOutputGraphQlDto, {
    name: "ofertaFormacaoNivelFormacaoFindAll",
  })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: OfertaFormacaoNivelFormacaoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoNivelFormacaoListOutputGraphQlDto> {
    const input = OfertaFormacaoNivelFormacaoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const listHandler = this.container.get<IOfertaFormacaoNivelFormacaoListQueryHandler>(
      IOfertaFormacaoNivelFormacaoListQueryHandler,
    );
    const result = await listHandler.execute(accessContext, input);
    return OfertaFormacaoNivelFormacaoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto, {
    name: "ofertaFormacaoNivelFormacaoFindById",
  })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const findOneHandler = this.container.get<IOfertaFormacaoNivelFormacaoFindOneQueryHandler>(
      IOfertaFormacaoNivelFormacaoFindOneQueryHandler,
    );
    const result = await findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, OfertaFormacaoNivelFormacao.entityName, id);
    return OfertaFormacaoNivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto, {
    name: "ofertaFormacaoNivelFormacaoCreate",
  })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: OfertaFormacaoNivelFormacaoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto> {
    const input = OfertaFormacaoNivelFormacaoGraphqlMapper.toCreateInput(dto);
    const createHandler = this.container.get<IOfertaFormacaoNivelFormacaoCreateCommandHandler>(
      IOfertaFormacaoNivelFormacaoCreateCommandHandler,
    );
    const result = await createHandler.execute(accessContext, input);
    return OfertaFormacaoNivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto, {
    name: "ofertaFormacaoNivelFormacaoUpdate",
  })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: OfertaFormacaoNivelFormacaoUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto> {
    const input = OfertaFormacaoNivelFormacaoGraphqlMapper.toUpdateInput({ id }, dto);
    const updateHandler = this.container.get<IOfertaFormacaoNivelFormacaoUpdateCommandHandler>(
      IOfertaFormacaoNivelFormacaoUpdateCommandHandler,
    );
    const result = await updateHandler.execute(accessContext, input);
    return OfertaFormacaoNivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "ofertaFormacaoNivelFormacaoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    const deleteHandler = this.container.get<IOfertaFormacaoNivelFormacaoDeleteCommandHandler>(
      IOfertaFormacaoNivelFormacaoDeleteCommandHandler,
    );
    return deleteHandler.execute(accessContext, { id });
  }
}
