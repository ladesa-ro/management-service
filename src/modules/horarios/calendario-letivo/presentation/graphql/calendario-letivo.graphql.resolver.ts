import { Inject } from "@nestjs/common";
import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { ICalendarioLetivoCreateCommandHandler } from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-create.command.handler.interface";
import { ICalendarioLetivoDeleteCommandHandler } from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-delete.command.handler.interface";
import { ICalendarioLetivoUpdateCommandHandler } from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-update.command.handler.interface";
import { ICalendarioLetivoFindOneQueryHandler } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import { ICalendarioLetivoListQueryHandler } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-list.query.handler.interface";
import {
  CalendarioLetivoCreateInputGraphQlDto,
  CalendarioLetivoFindOneOutputGraphQlDto,
  CalendarioLetivoListInputGraphQlDto,
  CalendarioLetivoListOutputGraphQlDto,
  CalendarioLetivoUpdateInputGraphQlDto,
} from "./calendario-letivo.graphql.dto";
import { CalendarioLetivoGraphqlMapper } from "./calendario-letivo.graphql.mapper";

@Resolver(() => CalendarioLetivoFindOneOutputGraphQlDto)
export class CalendarioLetivoGraphqlResolver {
  constructor(
    @Inject(ICalendarioLetivoListQueryHandler)
    private readonly listHandler: ICalendarioLetivoListQueryHandler,
    @Inject(ICalendarioLetivoFindOneQueryHandler)
    private readonly findOneHandler: ICalendarioLetivoFindOneQueryHandler,
    @Inject(ICalendarioLetivoCreateCommandHandler)
    private readonly createHandler: ICalendarioLetivoCreateCommandHandler,
    @Inject(ICalendarioLetivoUpdateCommandHandler)
    private readonly updateHandler: ICalendarioLetivoUpdateCommandHandler,
    @Inject(ICalendarioLetivoDeleteCommandHandler)
    private readonly deleteHandler: ICalendarioLetivoDeleteCommandHandler,
  ) {}

  @Query(() => CalendarioLetivoListOutputGraphQlDto, { name: "calendarioLetivoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: CalendarioLetivoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CalendarioLetivoListOutputGraphQlDto> {
    const input = CalendarioLetivoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.listHandler.execute({ accessContext, dto: input });
    return CalendarioLetivoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => CalendarioLetivoFindOneOutputGraphQlDto, { name: "calendarioLetivoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CalendarioLetivoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, "CalendarioLetivo", id);
    return CalendarioLetivoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CalendarioLetivoFindOneOutputGraphQlDto, { name: "calendarioLetivoCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: CalendarioLetivoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CalendarioLetivoFindOneOutputGraphQlDto> {
    const input = CalendarioLetivoGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
    return CalendarioLetivoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CalendarioLetivoFindOneOutputGraphQlDto, { name: "calendarioLetivoUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: CalendarioLetivoUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CalendarioLetivoFindOneOutputGraphQlDto> {
    const input = CalendarioLetivoGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute({ accessContext, dto: input });
    return CalendarioLetivoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "calendarioLetivoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto: { id } });
  }
}
