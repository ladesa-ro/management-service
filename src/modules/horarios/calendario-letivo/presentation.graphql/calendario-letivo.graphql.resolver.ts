import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo";
import {
  CalendarioLetivoCreateCommandMetadata,
  ICalendarioLetivoCreateCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-create.command.handler.interface";
import {
  CalendarioLetivoDeleteCommandMetadata,
  ICalendarioLetivoDeleteCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-delete.command.handler.interface";
import {
  CalendarioLetivoUpdateCommandMetadata,
  ICalendarioLetivoUpdateCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-update.command.handler.interface";
import {
  CalendarioLetivoFindOneQueryMetadata,
  ICalendarioLetivoFindOneQueryHandler,
} from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import {
  CalendarioLetivoListQueryMetadata,
  ICalendarioLetivoListQueryHandler,
} from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
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
    @DeclareDependency(ICalendarioLetivoListQueryHandler)
    private readonly listHandler: ICalendarioLetivoListQueryHandler,
    @DeclareDependency(ICalendarioLetivoFindOneQueryHandler)
    private readonly findOneHandler: ICalendarioLetivoFindOneQueryHandler,
    @DeclareDependency(ICalendarioLetivoCreateCommandHandler)
    private readonly createHandler: ICalendarioLetivoCreateCommandHandler,
    @DeclareDependency(ICalendarioLetivoUpdateCommandHandler)
    private readonly updateHandler: ICalendarioLetivoUpdateCommandHandler,
    @DeclareDependency(ICalendarioLetivoDeleteCommandHandler)
    private readonly deleteHandler: ICalendarioLetivoDeleteCommandHandler,
  ) {}

  @Query(() => CalendarioLetivoListOutputGraphQlDto, CalendarioLetivoListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: CalendarioLetivoListInputGraphQlDto,
  ): Promise<CalendarioLetivoListOutputGraphQlDto> {
    const input = CalendarioLetivoGraphqlMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return CalendarioLetivoGraphqlMapper.toListOutputDto(result);
  }

  @Query(
    () => CalendarioLetivoFindOneOutputGraphQlDto,
    CalendarioLetivoFindOneQueryMetadata.gqlMetadata,
  )
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<CalendarioLetivoFindOneOutputGraphQlDto> {
    const result = await this.findOneHandler.execute(accessContext, { id });
    ensureExists(result, CalendarioLetivo.entityName, id);
    return CalendarioLetivoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(
    () => CalendarioLetivoFindOneOutputGraphQlDto,
    CalendarioLetivoCreateCommandMetadata.gqlMetadata,
  )
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: CalendarioLetivoCreateInputGraphQlDto,
  ): Promise<CalendarioLetivoFindOneOutputGraphQlDto> {
    const input = CalendarioLetivoGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return CalendarioLetivoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(
    () => CalendarioLetivoFindOneOutputGraphQlDto,
    CalendarioLetivoUpdateCommandMetadata.gqlMetadata,
  )
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: CalendarioLetivoUpdateInputGraphQlDto,
  ): Promise<CalendarioLetivoFindOneOutputGraphQlDto> {
    const input = CalendarioLetivoGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return CalendarioLetivoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, CalendarioLetivoDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
