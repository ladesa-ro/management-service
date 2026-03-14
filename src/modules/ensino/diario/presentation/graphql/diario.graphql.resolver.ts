import { Inject } from "@nestjs/common";
import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IDiarioCreateCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-create.command.handler.interface";
import { IDiarioDeleteCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-delete.command.handler.interface";
import { IDiarioUpdateCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-update.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario.domain";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import { IDiarioListQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-list.query.handler.interface";
import {
  DiarioCreateInputGraphQlDto,
  DiarioFindOneOutputGraphQlDto,
  DiarioListInputGraphQlDto,
  DiarioListOutputGraphQlDto,
  DiarioUpdateInputGraphQlDto,
} from "./diario.graphql.dto";
import { DiarioGraphqlMapper } from "./diario.graphql.mapper";

@Resolver(() => DiarioFindOneOutputGraphQlDto)
export class DiarioGraphqlResolver {
  constructor(
    @Inject(IDiarioListQueryHandler) private readonly listHandler: IDiarioListQueryHandler,
    @Inject(IDiarioFindOneQueryHandler) private readonly findOneHandler: IDiarioFindOneQueryHandler,
    @Inject(IDiarioCreateCommandHandler)
    private readonly createHandler: IDiarioCreateCommandHandler,
    @Inject(IDiarioUpdateCommandHandler)
    private readonly updateHandler: IDiarioUpdateCommandHandler,
    @Inject(IDiarioDeleteCommandHandler)
    private readonly deleteHandler: IDiarioDeleteCommandHandler,
  ) {}

  @Query(() => DiarioListOutputGraphQlDto, { name: "diarioFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: DiarioListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioListOutputGraphQlDto> {
    const input = DiarioGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.listHandler.execute({ accessContext, dto: input });
    return DiarioGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DiarioFindOneOutputGraphQlDto, { name: "diarioFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, Diario.entityName, id);
    return DiarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioFindOneOutputGraphQlDto, { name: "diarioCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: DiarioCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioFindOneOutputGraphQlDto> {
    const input = DiarioGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
    return DiarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioFindOneOutputGraphQlDto, { name: "diarioUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: DiarioUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioFindOneOutputGraphQlDto> {
    const input = DiarioGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.updateHandler.execute({ accessContext, dto: input });
    return DiarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "diarioDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto: { id } });
  }
}
