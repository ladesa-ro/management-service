import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IOfertaFormacaoCreateCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-create.command.handler.interface";
import { IOfertaFormacaoDeleteCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-delete.command.handler.interface";
import { IOfertaFormacaoUpdateCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update.command.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.domain";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { IOfertaFormacaoListQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-list.query.handler.interface";
import {
  OfertaFormacaoCreateInputGraphQlDto,
  OfertaFormacaoFindOneOutputGraphQlDto,
  OfertaFormacaoListInputGraphQlDto,
  OfertaFormacaoListOutputGraphQlDto,
  OfertaFormacaoUpdateInputGraphQlDto,
} from "./oferta-formacao.graphql.dto";
import { OfertaFormacaoGraphqlMapper } from "./oferta-formacao.graphql.mapper";

@Resolver(() => OfertaFormacaoFindOneOutputGraphQlDto)
export class OfertaFormacaoGraphqlResolver {
  constructor(
    @DeclareDependency(IContainer)
    private readonly container: IContainer,
  ) {}

  @Query(() => OfertaFormacaoListOutputGraphQlDto, { name: "ofertaFormacaoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: OfertaFormacaoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoListOutputGraphQlDto> {
    const input = OfertaFormacaoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const listHandler = this.container.get<IOfertaFormacaoListQueryHandler>(
      IOfertaFormacaoListQueryHandler,
    );
    const result = await listHandler.execute({ accessContext, dto: input });
    return OfertaFormacaoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => OfertaFormacaoFindOneOutputGraphQlDto, { name: "ofertaFormacaoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const findOneHandler = this.container.get<IOfertaFormacaoFindOneQueryHandler>(
      IOfertaFormacaoFindOneQueryHandler,
    );
    const result = await findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, OfertaFormacao.entityName, id);
    return OfertaFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => OfertaFormacaoFindOneOutputGraphQlDto, { name: "ofertaFormacaoCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: OfertaFormacaoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoFindOneOutputGraphQlDto> {
    const input = OfertaFormacaoGraphqlMapper.toCreateInput(dto);
    const createHandler = this.container.get<IOfertaFormacaoCreateCommandHandler>(
      IOfertaFormacaoCreateCommandHandler,
    );
    const result = await createHandler.execute({ accessContext, dto: input });
    return OfertaFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => OfertaFormacaoFindOneOutputGraphQlDto, { name: "ofertaFormacaoUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: OfertaFormacaoUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoFindOneOutputGraphQlDto> {
    const input = OfertaFormacaoGraphqlMapper.toUpdateInput({ id }, dto);
    const updateHandler = this.container.get<IOfertaFormacaoUpdateCommandHandler>(
      IOfertaFormacaoUpdateCommandHandler,
    );
    const result = await updateHandler.execute({ accessContext, dto: input });
    return OfertaFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "ofertaFormacaoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    const deleteHandler = this.container.get<IOfertaFormacaoDeleteCommandHandler>(
      IOfertaFormacaoDeleteCommandHandler,
    );
    return deleteHandler.execute({ accessContext, dto: { id } });
  }
}
