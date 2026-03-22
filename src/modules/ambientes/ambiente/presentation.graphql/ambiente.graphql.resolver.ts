import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { ensureExists } from "@/application/errors";
import { DeclareDependency } from "@/domain/dependency-injection";
import { graphqlExtractSelection } from "@/infrastructure.graphql";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import {
  AmbienteCreateCommandMetadata,
  IAmbienteCreateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-create.command.handler.interface";
import {
  AmbienteDeleteCommandMetadata,
  IAmbienteDeleteCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-delete.command.handler.interface";
import {
  AmbienteUpdateCommandMetadata,
  IAmbienteUpdateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-update.command.handler.interface";
import {
  AmbienteFindOneQueryMetadata,
  IAmbienteFindOneQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import {
  AmbienteListQueryMetadata,
  IAmbienteListQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.handler.interface";
import { AccessContext, AccessContextGraphQL } from "@/server/access-context";
import {
  AmbienteCreateInputGraphQlDto,
  AmbienteFindOneOutputGraphQlDto,
  AmbienteListInputGraphQlDto,
  AmbienteListOutputGraphQlDto,
  AmbienteUpdateInputGraphQlDto,
} from "./ambiente.graphql.dto";
import { AmbienteGraphqlMapper } from "./ambiente.graphql.mapper";

@Resolver(() => AmbienteFindOneOutputGraphQlDto)
export class AmbienteGraphqlResolver {
  constructor(
    @DeclareDependency(IAmbienteListQueryHandler)
    private readonly listHandler: IAmbienteListQueryHandler,
    @DeclareDependency(IAmbienteFindOneQueryHandler)
    private readonly findOneHandler: IAmbienteFindOneQueryHandler,
    @DeclareDependency(IAmbienteCreateCommandHandler)
    private readonly createHandler: IAmbienteCreateCommandHandler,
    @DeclareDependency(IAmbienteUpdateCommandHandler)
    private readonly updateHandler: IAmbienteUpdateCommandHandler,
    @DeclareDependency(IAmbienteDeleteCommandHandler)
    private readonly deleteHandler: IAmbienteDeleteCommandHandler,
  ) {}

  @Query(() => AmbienteListOutputGraphQlDto, AmbienteListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: AmbienteListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteListOutputGraphQlDto> {
    const input = AmbienteGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }
    const result = await this.listHandler.execute(accessContext, input);
    return AmbienteGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => AmbienteFindOneOutputGraphQlDto, AmbienteFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, Ambiente.entityName, id);
    return AmbienteGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => AmbienteFindOneOutputGraphQlDto, AmbienteCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: AmbienteCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const input = AmbienteGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return AmbienteGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => AmbienteFindOneOutputGraphQlDto, AmbienteUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: AmbienteUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const input = AmbienteGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return AmbienteGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, AmbienteDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
