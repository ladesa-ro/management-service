import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco";
import { IBlocoCreateCommandHandler } from "@/modules/ambientes/bloco/domain/commands/bloco-create.command.handler.interface";
import { IBlocoDeleteCommandHandler } from "@/modules/ambientes/bloco/domain/commands/bloco-delete.command.handler.interface";
import { IBlocoUpdateCommandHandler } from "@/modules/ambientes/bloco/domain/commands/bloco-update.command.handler.interface";
import { IBlocoFindOneQueryHandler } from "@/modules/ambientes/bloco/domain/queries/bloco-find-one.query.handler.interface";
import { IBlocoListQueryHandler } from "@/modules/ambientes/bloco/domain/queries/bloco-list.query.handler.interface";
import {
  BlocoCreateInputGraphQlDto,
  BlocoFindOneOutputGraphQlDto,
  BlocoListInputGraphQlDto,
  BlocoListOutputGraphQlDto,
  BlocoUpdateInputGraphQlDto,
} from "./bloco.graphql.dto";
import { BlocoGraphqlMapper } from "./bloco.graphql.mapper";

@Resolver(() => BlocoFindOneOutputGraphQlDto)
export class BlocoGraphqlResolver {
  constructor(
    @DeclareDependency(IBlocoListQueryHandler)
    private readonly listHandler: IBlocoListQueryHandler,
    @DeclareDependency(IBlocoFindOneQueryHandler)
    private readonly findOneHandler: IBlocoFindOneQueryHandler,
    @DeclareDependency(IBlocoCreateCommandHandler)
    private readonly createHandler: IBlocoCreateCommandHandler,
    @DeclareDependency(IBlocoUpdateCommandHandler)
    private readonly updateHandler: IBlocoUpdateCommandHandler,
    @DeclareDependency(IBlocoDeleteCommandHandler)
    private readonly deleteHandler: IBlocoDeleteCommandHandler,
  ) {}

  @Query(() => BlocoListOutputGraphQlDto, { name: "blocoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: BlocoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoListOutputGraphQlDto> {
    const input = BlocoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }
    const result = await this.listHandler.execute(accessContext, input);
    return BlocoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => BlocoFindOneOutputGraphQlDto, { name: "blocoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, Bloco.entityName, id);
    return BlocoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => BlocoFindOneOutputGraphQlDto, { name: "blocoCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: BlocoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const input = BlocoGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return BlocoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => BlocoFindOneOutputGraphQlDto, { name: "blocoUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: BlocoUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const input = BlocoGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return BlocoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "blocoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
