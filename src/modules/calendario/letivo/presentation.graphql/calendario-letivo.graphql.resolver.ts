import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { CalendarioLetivo } from "@/modules/calendario/letivo/domain/calendario-letivo";
import {
  CalendarioLetivoCreateCommandMetadata,
  ICalendarioLetivoCreateCommandHandler,
} from "@/modules/calendario/letivo/domain/commands/calendario-letivo-create.command.handler.interface";
import {
  CalendarioLetivoDeleteCommandMetadata,
  ICalendarioLetivoDeleteCommandHandler,
} from "@/modules/calendario/letivo/domain/commands/calendario-letivo-delete.command.handler.interface";
import {
  CalendarioLetivoUpdateCommandMetadata,
  ICalendarioLetivoUpdateCommandHandler,
} from "@/modules/calendario/letivo/domain/commands/calendario-letivo-update.command.handler.interface";
import {
  CalendarioLetivoFindOneQueryMetadata,
  ICalendarioLetivoFindOneQueryHandler,
} from "@/modules/calendario/letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import {
  CalendarioLetivoListQueryMetadata,
  ICalendarioLetivoListQueryHandler,
} from "@/modules/calendario/letivo/domain/queries/calendario-letivo-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  CalendarioLetivoCreateInputGraphQlDto,
  CalendarioLetivoFindOneOutputGraphQlDto,
  CalendarioLetivoListInputGraphQlDto,
  CalendarioLetivoListOutputGraphQlDto,
  CalendarioLetivoUpdateInputGraphQlDto,
} from "./calendario-letivo.graphql.dto";
import * as CalendarioLetivoGraphqlMapper from "./calendario-letivo.graphql.mapper";

@Resolver(() => CalendarioLetivoFindOneOutputGraphQlDto)
export class CalendarioLetivoGraphqlResolver {
  constructor(
    @Dep(ICalendarioLetivoListQueryHandler)
    private readonly listHandler: ICalendarioLetivoListQueryHandler,
    @Dep(ICalendarioLetivoFindOneQueryHandler)
    private readonly findOneHandler: ICalendarioLetivoFindOneQueryHandler,
    @Dep(ICalendarioLetivoCreateCommandHandler)
    private readonly createHandler: ICalendarioLetivoCreateCommandHandler,
    @Dep(ICalendarioLetivoUpdateCommandHandler)
    private readonly updateHandler: ICalendarioLetivoUpdateCommandHandler,
    @Dep(ICalendarioLetivoDeleteCommandHandler)
    private readonly deleteHandler: ICalendarioLetivoDeleteCommandHandler,
  ) {}

  @Query(() => CalendarioLetivoListOutputGraphQlDto, CalendarioLetivoListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: CalendarioLetivoListInputGraphQlDto,
  ): Promise<CalendarioLetivoListOutputGraphQlDto> {
    const query = CalendarioLetivoGraphqlMapper.listInputDtoToListQuery(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return CalendarioLetivoGraphqlMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Query(
    () => CalendarioLetivoFindOneOutputGraphQlDto,
    CalendarioLetivoFindOneQueryMetadata.gqlMetadata,
  )
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<CalendarioLetivoFindOneOutputGraphQlDto> {
    const queryResult = await this.findOneHandler.execute(accessContext, { id });
    ensureExists(queryResult, CalendarioLetivo.entityName, id);
    return CalendarioLetivoGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(
    () => CalendarioLetivoFindOneOutputGraphQlDto,
    CalendarioLetivoCreateCommandMetadata.gqlMetadata,
  )
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: CalendarioLetivoCreateInputGraphQlDto,
  ): Promise<CalendarioLetivoFindOneOutputGraphQlDto> {
    const command = CalendarioLetivoGraphqlMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return CalendarioLetivoGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
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
    const command = CalendarioLetivoGraphqlMapper.updateInputDtoToUpdateCommand.map({ id, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return CalendarioLetivoGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => Boolean, CalendarioLetivoDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
