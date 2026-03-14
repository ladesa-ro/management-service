import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import { ICampusCreateCommandHandler } from "@/modules/ambientes/campus/domain/commands/campus-create.command.handler.interface";
import { ICampusDeleteCommandHandler } from "@/modules/ambientes/campus/domain/commands/campus-delete.command.handler.interface";
import { ICampusUpdateCommandHandler } from "@/modules/ambientes/campus/domain/commands/campus-update.command.handler.interface";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { ICampusListQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import {
  CampusCreateInputGraphQlDto,
  CampusFindOneOutputGraphQlDto,
  CampusListInputGraphQlDto,
  CampusListOutputGraphQlDto,
  CampusUpdateInputGraphQlDto,
} from "./campus.graphql.dto";
import { CampusGraphqlMapper } from "./campus.graphql.mapper";

@Resolver(() => CampusFindOneOutputGraphQlDto)
export class CampusGraphqlResolver {
  constructor(
    @DeclareDependency(IContainer)
    private readonly container: IContainer,
  ) {}

  @Query(() => CampusListOutputGraphQlDto, { name: "campusFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: CampusListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusListOutputGraphQlDto> {
    const input = CampusGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const listHandler = this.container.get<ICampusListQueryHandler>(ICampusListQueryHandler);
    const result = await listHandler.execute({ accessContext, dto: input });
    return CampusGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => CampusFindOneOutputGraphQlDto, { name: "campusFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const findOneHandler = this.container.get<ICampusFindOneQueryHandler>(
      ICampusFindOneQueryHandler,
    );
    const result = await findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, Campus.entityName, id);
    return CampusGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CampusFindOneOutputGraphQlDto, { name: "campusCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: CampusCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusFindOneOutputGraphQlDto> {
    const input = CampusGraphqlMapper.toCreateInput(dto);
    const createHandler = this.container.get<ICampusCreateCommandHandler>(
      ICampusCreateCommandHandler,
    );
    const result = await createHandler.execute({ accessContext, dto: input });
    return CampusGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CampusFindOneOutputGraphQlDto, { name: "campusUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: CampusUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusFindOneOutputGraphQlDto> {
    const input = CampusGraphqlMapper.toUpdateInput({ id }, dto);
    const updateHandler = this.container.get<ICampusUpdateCommandHandler>(
      ICampusUpdateCommandHandler,
    );
    const result = await updateHandler.execute({ accessContext, dto: input });
    return CampusGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "campusDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    const deleteHandler = this.container.get<ICampusDeleteCommandHandler>(
      ICampusDeleteCommandHandler,
    );
    return deleteHandler.execute({ accessContext, dto: { id } });
  }
}
