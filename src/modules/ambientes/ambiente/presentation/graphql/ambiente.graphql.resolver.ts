import { Inject } from "@nestjs/common";
import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IAmbienteCreateCommandHandler } from "@/modules/ambientes/ambiente/domain/commands/ambiente-create.command.handler.interface";
import { IAmbienteDeleteCommandHandler } from "@/modules/ambientes/ambiente/domain/commands/ambiente-delete.command.handler.interface";
import { IAmbienteUpdateCommandHandler } from "@/modules/ambientes/ambiente/domain/commands/ambiente-update.command.handler.interface";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { IAmbienteListQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.handler.interface";
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
    @Inject(IAmbienteListQueryHandler) private readonly listHandler: IAmbienteListQueryHandler,
    @Inject(IAmbienteFindOneQueryHandler)
    private readonly findOneHandler: IAmbienteFindOneQueryHandler,
    @Inject(IAmbienteCreateCommandHandler)
    private readonly createHandler: IAmbienteCreateCommandHandler,
    @Inject(IAmbienteUpdateCommandHandler)
    private readonly updateHandler: IAmbienteUpdateCommandHandler,
    @Inject(IAmbienteDeleteCommandHandler)
    private readonly deleteHandler: IAmbienteDeleteCommandHandler,
  ) {}

  @Query(() => AmbienteListOutputGraphQlDto, { name: "ambienteFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: AmbienteListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteListOutputGraphQlDto> {
    const input = AmbienteGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.listHandler.execute({ accessContext, dto: input });
    return AmbienteGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => AmbienteFindOneOutputGraphQlDto, { name: "ambienteFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, "Ambiente", id);
    return AmbienteGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => AmbienteFindOneOutputGraphQlDto, { name: "ambienteCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: AmbienteCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const input = AmbienteGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
    return AmbienteGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => AmbienteFindOneOutputGraphQlDto, { name: "ambienteUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: AmbienteUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const input = AmbienteGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute({ accessContext, dto: input });
    return AmbienteGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "ambienteDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto: { id } });
  }
}
