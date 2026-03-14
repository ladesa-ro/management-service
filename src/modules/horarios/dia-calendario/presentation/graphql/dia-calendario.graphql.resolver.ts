import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IDiaCalendarioCreateCommandHandler } from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-create.command.handler.interface";
import { IDiaCalendarioDeleteCommandHandler } from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-delete.command.handler.interface";
import { IDiaCalendarioUpdateCommandHandler } from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-update.command.handler.interface";
import { DiaCalendario } from "@/modules/horarios/dia-calendario/domain/dia-calendario.domain";
import { IDiaCalendarioFindOneQueryHandler } from "@/modules/horarios/dia-calendario/domain/queries/dia-calendario-find-one.query.handler.interface";
import { IDiaCalendarioListQueryHandler } from "@/modules/horarios/dia-calendario/domain/queries/dia-calendario-list.query.handler.interface";
import {
  DiaCalendarioCreateInputGraphQlDto,
  DiaCalendarioFindOneOutputGraphQlDto,
  DiaCalendarioListInputGraphQlDto,
  DiaCalendarioListOutputGraphQlDto,
  DiaCalendarioUpdateInputGraphQlDto,
} from "./dia-calendario.graphql.dto";
import { DiaCalendarioGraphqlMapper } from "./dia-calendario.graphql.mapper";

@Resolver(() => DiaCalendarioFindOneOutputGraphQlDto)
export class DiaCalendarioGraphqlResolver {
  constructor(
    @DeclareDependency(IDiaCalendarioListQueryHandler)
    private readonly listHandler: IDiaCalendarioListQueryHandler,
    @DeclareDependency(IDiaCalendarioFindOneQueryHandler)
    private readonly findOneHandler: IDiaCalendarioFindOneQueryHandler,
    @DeclareDependency(IDiaCalendarioCreateCommandHandler)
    private readonly createHandler: IDiaCalendarioCreateCommandHandler,
    @DeclareDependency(IDiaCalendarioUpdateCommandHandler)
    private readonly updateHandler: IDiaCalendarioUpdateCommandHandler,
    @DeclareDependency(IDiaCalendarioDeleteCommandHandler)
    private readonly deleteHandler: IDiaCalendarioDeleteCommandHandler,
  ) {}

  @Query(() => DiaCalendarioListOutputGraphQlDto, { name: "diaCalendarioFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: DiaCalendarioListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiaCalendarioListOutputGraphQlDto> {
    const input = DiaCalendarioGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.listHandler.execute({ accessContext, dto: input });
    return DiaCalendarioGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DiaCalendarioFindOneOutputGraphQlDto, { name: "diaCalendarioFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiaCalendarioFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, DiaCalendario.entityName, id);
    return DiaCalendarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiaCalendarioFindOneOutputGraphQlDto, { name: "diaCalendarioCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: DiaCalendarioCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiaCalendarioFindOneOutputGraphQlDto> {
    const input = DiaCalendarioGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
    return DiaCalendarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiaCalendarioFindOneOutputGraphQlDto, { name: "diaCalendarioUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: DiaCalendarioUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiaCalendarioFindOneOutputGraphQlDto> {
    const input = DiaCalendarioGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.updateHandler.execute({ accessContext, dto: input });
    return DiaCalendarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "diaCalendarioDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto: { id } });
  }
}
