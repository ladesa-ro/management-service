import { Inject } from "@nestjs/common";
import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IOfertaFormacaoNivelFormacaoCreateCommandHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-create.command.handler.interface";
import { IOfertaFormacaoNivelFormacaoDeleteCommandHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-delete.command.handler.interface";
import { IOfertaFormacaoNivelFormacaoUpdateCommandHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-update.command.handler.interface";
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
  constructor(
    @Inject(IOfertaFormacaoNivelFormacaoListQueryHandler)
    private readonly listHandler: IOfertaFormacaoNivelFormacaoListQueryHandler,
    @Inject(IOfertaFormacaoNivelFormacaoFindOneQueryHandler)
    private readonly findOneHandler: IOfertaFormacaoNivelFormacaoFindOneQueryHandler,
    @Inject(IOfertaFormacaoNivelFormacaoCreateCommandHandler)
    private readonly createHandler: IOfertaFormacaoNivelFormacaoCreateCommandHandler,
    @Inject(IOfertaFormacaoNivelFormacaoUpdateCommandHandler)
    private readonly updateHandler: IOfertaFormacaoNivelFormacaoUpdateCommandHandler,
    @Inject(IOfertaFormacaoNivelFormacaoDeleteCommandHandler)
    private readonly deleteHandler: IOfertaFormacaoNivelFormacaoDeleteCommandHandler,
  ) {}

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

    const result = await this.listHandler.execute({ accessContext, dto: input });
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
    const result = await this.findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, "OfertaFormacaoNivelFormacao", id);
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
    const result = await this.createHandler.execute({ accessContext, dto: input });
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
    const result = await this.updateHandler.execute({ accessContext, dto: input });
    return OfertaFormacaoNivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "ofertaFormacaoNivelFormacaoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto: { id } });
  }
}
