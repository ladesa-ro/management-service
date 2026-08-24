import { Controller, Get, Header, Query } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { CalendarioAgendamentoVisibilidadeService } from "@/modules/calendario/agendamento/application/authorization/calendario-agendamento-visibilidade.service";
import { CalendarioAgendamentoTipo } from "@/modules/calendario/agendamento/domain/calendario-agendamento.types";
import * as CalendarioAgendamentoRestMapper from "@/modules/calendario/agendamento/presentation.rest/calendario-agendamento.rest.mapper";
import { ITurmaMatriculaRepository } from "@/modules/ensino/turma/matricula/domain/repositories";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  CalendarioAgendamentoExportarIcsQueryMetadata,
  CalendarioColecaoMudancasDesdeQueryMetadata,
  CalendarioOcupacaoSemDetalheQueryMetadata,
  ConsultaOcorrenciasPorDataQueryMetadata,
  ICalendarioAgendamentoExportarIcsQueryHandler,
  ICalendarioColecaoMudancasDesdeQueryHandler,
  ICalendarioOcupacaoSemDetalheQueryHandler,
  IConsultaOcorrenciasPorDataQueryHandler,
} from "../domain/queries";
import {
  CalendarioAgendamentoExportarIcsQueryRestDto,
  CalendarioColecaoMudancasDesdeOutputRestDto,
  CalendarioColecaoMudancasDesdeQueryRestDto,
  CalendarioOcupacaoSemDetalheOutputRestDto,
  CalendarioOcupacaoSemDetalheQueryRestDto,
  ConsultaOcorrenciasOutputRestDto,
  ConsultaOcorrenciasQueryRestDto,
} from "./consultas.rest.dto";

@ApiTags("calendario")
@Controller("/calendario/consultas")
export class ConsultasRestController {
  constructor(
    @DeclareDependency(IConsultaOcorrenciasPorDataQueryHandler)
    private readonly queryHandler: IConsultaOcorrenciasPorDataQueryHandler,
    @DeclareDependency(ICalendarioOcupacaoSemDetalheQueryHandler)
    private readonly ocupacaoSemDetalheQueryHandler: ICalendarioOcupacaoSemDetalheQueryHandler,
    @DeclareDependency(ICalendarioAgendamentoExportarIcsQueryHandler)
    private readonly exportarIcsQueryHandler: ICalendarioAgendamentoExportarIcsQueryHandler,
    @DeclareDependency(ICalendarioColecaoMudancasDesdeQueryHandler)
    private readonly colecaoMudancasDesdeQueryHandler: ICalendarioColecaoMudancasDesdeQueryHandler,
    @DeclareDependency(CalendarioAgendamentoVisibilidadeService)
    private readonly visibilidadeService: CalendarioAgendamentoVisibilidadeService,
    @DeclareDependency(ITurmaMatriculaRepository)
    private readonly turmaMatriculaRepository: ITurmaMatriculaRepository,
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

    const alunoDaTurmaFiltrada =
      queryParams.turma !== undefined && accessContext.requestActor
        ? await this.turmaMatriculaRepository.existsActiveForUsuarioInTurma(
            accessContext.requestActor.id,
            queryParams.turma,
          )
        : false;

    const visiveis = alunoDaTurmaFiltrada
      ? results
      : await this.visibilidadeService.aplicarVisibilidadeMuitos(accessContext, results);

    return {
      ocorrencias: CalendarioAgendamentoRestMapper.findOneQueryResultToOutputDto.mapArray(visiveis),
    };
  }

  @Get("/ocorrencias/ics")
  @ApiOperation(CalendarioAgendamentoExportarIcsQueryMetadata.swaggerMetadata)
  @Header("Content-Type", "text/calendar; charset=utf-8")
  @Header("Content-Disposition", 'attachment; filename="agenda.ics"')
  @ApiOkResponse({ description: "Arquivo .ics (RFC 5545) com as ocorrências do período" })
  @ApiForbiddenResponse()
  async exportarIcs(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() queryParams: CalendarioAgendamentoExportarIcsQueryRestDto,
  ): Promise<string> {
    const tipo = queryParams.tipo ? (queryParams.tipo as CalendarioAgendamentoTipo) : undefined;

    return this.exportarIcsQueryHandler.execute(accessContext, {
      dateStart: queryParams.dateStart,
      dateEnd: queryParams.dateEnd,
      campus: queryParams.campus,
      turma: queryParams.turma,
      professor: queryParams.professor,
      tipo,
    });
  }

  @Get("/ocupacao")
  @ApiOperation(CalendarioOcupacaoSemDetalheQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioOcupacaoSemDetalheOutputRestDto })
  @ApiForbiddenResponse()
  async findOcupacaoSemDetalhe(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() queryParams: CalendarioOcupacaoSemDetalheQueryRestDto,
  ): Promise<CalendarioOcupacaoSemDetalheOutputRestDto> {
    const ocupacoes = await this.ocupacaoSemDetalheQueryHandler.execute(accessContext, {
      campus: queryParams.campus,
      dateStart: queryParams.dateStart,
      dateEnd: queryParams.dateEnd,
    });

    return { ocupacoes };
  }

  @Get("/colecao/mudancas-desde")
  @ApiOperation(CalendarioColecaoMudancasDesdeQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioColecaoMudancasDesdeOutputRestDto })
  @ApiForbiddenResponse()
  async findColecaoMudancasDesde(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() queryParams: CalendarioColecaoMudancasDesdeQueryRestDto,
  ): Promise<CalendarioColecaoMudancasDesdeOutputRestDto> {
    const { syncToken, agendamentos } = await this.colecaoMudancasDesdeQueryHandler.execute(
      accessContext,
      { colecaoId: queryParams.colecaoId, desde: queryParams.desde },
    );

    const visiveis = await this.visibilidadeService.aplicarVisibilidadeMuitos(
      accessContext,
      agendamentos,
    );

    return {
      syncToken,
      agendamentos: CalendarioAgendamentoRestMapper.findOneQueryResultToOutputDto.mapArray(
        visiveis,
      ),
    };
  }
}
