import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { CalendarioOcupacaoSemDetalheQuery } from "../../domain/queries/calendario-ocupacao-sem-detalhe.query";
import { ICalendarioOcupacaoSemDetalheQueryHandler } from "../../domain/queries/calendario-ocupacao-sem-detalhe.query.handler.interface";
import type { CalendarioOcupacaoSemDetalheQueryResult } from "../../domain/queries/calendario-ocupacao-sem-detalhe.query.result";
import { IConsultaOcorrenciasPorDataQueryHandler } from "../../domain/queries/consulta-ocorrencias-por-data.query.handler.interface";

@DeclareImplementation()
export class CalendarioOcupacaoSemDetalheQueryHandlerImpl
  implements ICalendarioOcupacaoSemDetalheQueryHandler
{
  constructor(
    @DeclareDependency(IConsultaOcorrenciasPorDataQueryHandler)
    private readonly consultaOcorrenciasHandler: IConsultaOcorrenciasPorDataQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: CalendarioOcupacaoSemDetalheQuery,
  ): Promise<CalendarioOcupacaoSemDetalheQueryResult> {
    const ocorrencias = await this.consultaOcorrenciasHandler.execute(accessContext, {
      dateStart: query.dateStart,
      dateEnd: query.dateEnd,
      campus: query.campus,
    });

    return ocorrencias.map((ocorrencia) => ({
      data: ocorrencia.dataInicio.slice(0, 10),
      horarioInicio: ocorrencia.horarioInicio,
      horarioFim: ocorrencia.horarioFim,
      ambienteIds: ocorrencia.ambientes.map((ambiente) => ambiente.id),
      professorIds: ocorrencia.perfis.map((perfil) => perfil.id),
    }));
  }
}
