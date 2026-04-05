import { Controller, Get, Query } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { CalendarioAgendamentoTipo } from "@/modules/calendario/agendamento/domain/calendario-agendamento.types";
import * as CalendarioAgendamentoRestMapper from "@/modules/calendario/agendamento/presentation.rest/calendario-agendamento.rest.mapper";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  ConsultaOcorrenciasPorDataQueryMetadata,
  IConsultaOcorrenciasPorDataQueryHandler,
} from "../domain/queries";
import {
  ConsultaOcorrenciasOutputRestDto,
  ConsultaOcorrenciasQueryRestDto,
} from "./consultas.rest.dto";

@ApiTags("calendario")
@Controller("/calendario/consultas")
export class ConsultasRestController {
  constructor(
    @DeclareDependency(IConsultaOcorrenciasPorDataQueryHandler)
    private readonly queryHandler: IConsultaOcorrenciasPorDataQueryHandler,
  ) {}

  @Get("/ocorrencias")
  @ApiOperation(ConsultaOcorrenciasPorDataQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: ConsultaOcorrenciasOutputRestDto })
  @ApiForbiddenResponse()
  async findOcorrencias(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() queryParams: ConsultaOcorrenciasQueryRestDto,
  ): Promise<ConsultaOcorrenciasOutputRestDto> {
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
      ocorrencias: CalendarioAgendamentoRestMapper.findOneQueryResultToOutputDto.mapArray(results),
    };
  }

  @Get("/agendamentos")
  @ApiOperation({ ...ConsultaOcorrenciasPorDataQueryMetadata.swaggerMetadata, deprecated: true })
  @ApiOkResponse({ type: ConsultaOcorrenciasOutputRestDto })
  @ApiForbiddenResponse()
  async findAgendamentos(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() queryParams: ConsultaOcorrenciasQueryRestDto,
  ): Promise<ConsultaOcorrenciasOutputRestDto> {
    return this.findOcorrencias(accessContext, queryParams);
  }
}
