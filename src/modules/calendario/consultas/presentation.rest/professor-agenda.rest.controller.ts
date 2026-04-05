import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { ICalendarioAgendamentoListQueryHandler } from "@/modules/calendario/agendamento/domain/queries/calendario-agendamento-list.query.handler.interface";
import {
  CalendarioAgendamentoListInputRestDto,
  CalendarioAgendamentoListOutputRestDto,
} from "@/modules/calendario/agendamento/presentation.rest/calendario-agendamento.rest.dto";
import * as CalendarioAgendamentoRestMapper from "@/modules/calendario/agendamento/presentation.rest/calendario-agendamento.rest.mapper";
import { AccessContextHttp } from "@/server/nest/access-context";

class ProfessorAgendaParamsRestDto {
  @IsUUID()
  perfilId!: string;
}

@ApiTags("calendario")
@Controller("/calendario/professores")
export class ProfessorAgendaRestController {
  constructor(
    @Dep(ICalendarioAgendamentoListQueryHandler)
    private readonly listHandler: ICalendarioAgendamentoListQueryHandler,
  ) {}

  @Get("/:perfilId/agenda")
  @ApiOperation({
    operationId: "professorAgendaFindAll",
    summary: "Lista agendamentos de um professor",
  })
  @ApiParam({ name: "perfilId", type: "string", format: "uuid" })
  @ApiOkResponse({ type: CalendarioAgendamentoListOutputRestDto })
  async findAgenda(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: ProfessorAgendaParamsRestDto,
    @Query() queryDto: CalendarioAgendamentoListInputRestDto,
  ): Promise<CalendarioAgendamentoListOutputRestDto> {
    const query = CalendarioAgendamentoRestMapper.listInputDtoToListQuery.map(queryDto);

    // Force perfil filter from path param
    query["filter.perfil.id"] = [params.perfilId];

    const result = await this.listHandler.execute(accessContext, query);
    return CalendarioAgendamentoRestMapper.listQueryResultToListOutputDto(result);
  }
}
