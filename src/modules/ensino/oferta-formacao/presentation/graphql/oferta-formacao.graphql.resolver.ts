import { Inject } from "@nestjs/common";
import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IOfertaFormacaoCreateCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-create.command.handler.interface";
import { IOfertaFormacaoDeleteCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-delete.command.handler.interface";
import { IOfertaFormacaoUpdateCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update.command.handler.interface";
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
    @Inject(IOfertaFormacaoListQueryHandler)
    private readonly listHandler: IOfertaFormacaoListQueryHandler,
    @Inject(IOfertaFormacaoFindOneQueryHandler)
    private readonly findOneHandler: IOfertaFormacaoFindOneQueryHandler,
    @Inject(IOfertaFormacaoCreateCommandHandler)
    private readonly createHandler: IOfertaFormacaoCreateCommandHandler,
    @Inject(IOfertaFormacaoUpdateCommandHandler)
    private readonly updateHandler: IOfertaFormacaoUpdateCommandHandler,
    @Inject(IOfertaFormacaoDeleteCommandHandler)
    private readonly deleteHandler: IOfertaFormacaoDeleteCommandHandler,
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

    const result = await this.listHandler.execute({ accessContext, dto: input });
    return OfertaFormacaoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => OfertaFormacaoFindOneOutputGraphQlDto, { name: "ofertaFormacaoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute({ accessContext, dto: { id, selection } });
    if (!result) {
      throw new ResourceNotFoundError("OfertaFormacao", id);
    }
    return OfertaFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => OfertaFormacaoFindOneOutputGraphQlDto, { name: "ofertaFormacaoCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: OfertaFormacaoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoFindOneOutputGraphQlDto> {
    const input = OfertaFormacaoGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
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
    const result = await this.updateHandler.execute({ accessContext, dto: input });
    return OfertaFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "ofertaFormacaoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto: { id } });
  }
}
