import { Controller, Get, Query } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { CalendarioAgendamentoTipo } from "@/modules/calendario/agendamento/domain/calendario-agendamento.types";
import * as CalendarioEventoRestMapper from "@/modules/calendario/agendamento/presentation.rest/calendario-evento.rest.mapper";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  ConsultaAgendamentosPorDataQueryMetadata,
  IConsultaAgendamentosPorDataQueryHandler,
} from "../domain/queries";
import {
  ConsultaAgendamentosOutputRestDto,
  ConsultaAgendamentosQueryRestDto,
} from "./consultas.rest.dto";

@ApiTags("calendario-consultas")
@Controller("/calendario/consultas")
export class ConsultasRestController {
  constructor(
    @DeclareDependency(IConsultaAgendamentosPorDataQueryHandler)
    private readonly queryHandler: IConsultaAgendamentosPorDataQueryHandler,
  ) {}

  @Get("/agendamentos")
  @ApiOperation(ConsultaAgendamentosPorDataQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: ConsultaAgendamentosOutputRestDto })
  @ApiForbiddenResponse()
  async findAgendamentos(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() queryParams: ConsultaAgendamentosQueryRestDto,
  ): Promise<ConsultaAgendamentosOutputRestDto> {
    const tipo = queryParams.tipo ? (queryParams.tipo as CalendarioAgendamentoTipo) : undefined;

    const results = await this.queryHandler.execute(accessContext, {
      dateStart: queryParams.dateStart,
      dateEnd: queryParams.dateEnd,
      campus: queryParams.campus,
      turma: queryParams.turma,
      professor: queryParams.professor,
      tipo,
    });

    return {
      agendamentos: CalendarioEventoRestMapper.findOneQueryResultToOutputDto.mapArray(results),
    };
  }
}
