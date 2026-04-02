import { Controller, Get, Query } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
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
    const results = await this.queryHandler.execute(accessContext, {
      dateStart: queryParams.dateStart,
      dateEnd: queryParams.dateEnd,
      campus: queryParams.campus,
      turma: queryParams.turma,
      professor: queryParams.professor,
    });

    return {
      agendamentos: results.map((r) => ({
        id: r.id,
        tipo: r.tipo,
        nome: r.nome,
        dataInicio: r.dataInicio,
        dataFim: r.dataFim,
        diaInteiro: r.diaInteiro,
        horarioInicio: r.horarioInicio,
        horarioFim: r.horarioFim,
        cor: r.cor,
        status: r.status,
        turmaIds: r.turmaIds,
        perfilIds: r.perfilIds,
        ambienteIds: r.ambienteIds,
        diarioIds: r.diarioIds,
      })),
    };
  }
}
