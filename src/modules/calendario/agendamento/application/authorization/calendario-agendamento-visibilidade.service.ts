import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { CalendarioColecaoAcessoResolverService } from "@/modules/calendario/colecao/application/calendario-colecao-acesso-resolver.service";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";

export type CalendarioAgendamentoVisibilidade =
  | "SEM_RESTRICAO"
  | "EDITOR"
  | "LEITOR"
  | "OCUPACAO"
  | "SEM_ACESSO";

@Impl()
export class CalendarioAgendamentoVisibilidadeService {
  constructor(
    @Dep(CalendarioColecaoAcessoResolverService)
    private readonly colecaoAcessoResolver: CalendarioColecaoAcessoResolverService,
  ) {}

  async resolver(
    accessContext: IAccessContext | null,
    colecaoId: string | null,
  ): Promise<CalendarioAgendamentoVisibilidade> {
    if (colecaoId === null) {
      return "SEM_RESTRICAO";
    }

    const papel = await this.colecaoAcessoResolver.resolverPapelEfetivoParaColecao(
      accessContext,
      colecaoId,
    );

    return papel ?? "SEM_ACESSO";
  }

  podeEditar(visibilidade: CalendarioAgendamentoVisibilidade): boolean {
    return visibilidade === "SEM_RESTRICAO" || visibilidade === "EDITOR";
  }

  podeVerDetalhes(visibilidade: CalendarioAgendamentoVisibilidade): boolean {
    return (
      visibilidade === "SEM_RESTRICAO" || visibilidade === "EDITOR" || visibilidade === "LEITOR"
    );
  }

  temAlgumAcesso(visibilidade: CalendarioAgendamentoVisibilidade): boolean {
    return visibilidade !== "SEM_ACESSO";
  }

  async aplicarVisibilidadeUm(
    accessContext: IAccessContext | null,
    resultado: CalendarioAgendamentoFindOneQueryResult,
  ): Promise<CalendarioAgendamentoFindOneQueryResult | null> {
    const colecaoId = resultado.colecao?.id ?? null;
    const visibilidade = await this.resolver(accessContext, colecaoId);

    return this.aplicarARaw(resultado, visibilidade);
  }

  async aplicarVisibilidadeMuitos(
    accessContext: IAccessContext | null,
    resultados: CalendarioAgendamentoFindOneQueryResult[],
  ): Promise<CalendarioAgendamentoFindOneQueryResult[]> {
    const colecaoIdsDistintos = [
      ...new Set(
        resultados
          .map((resultado) => resultado.colecao?.id ?? null)
          .filter((colecaoId): colecaoId is string => colecaoId !== null),
      ),
    ];

    const entradas = await Promise.all(
      colecaoIdsDistintos.map(
        async (colecaoId) => [colecaoId, await this.resolver(accessContext, colecaoId)] as const,
      ),
    );
    const visibilidadePorColecao = new Map(entradas);

    const aplicados = resultados.map((resultado) => {
      const colecaoId = resultado.colecao?.id ?? null;
      const visibilidade =
        colecaoId === null
          ? "SEM_RESTRICAO"
          : (visibilidadePorColecao.get(colecaoId) ?? "SEM_ACESSO");

      return this.aplicarARaw(resultado, visibilidade);
    });

    return aplicados.filter(
      (resultado): resultado is CalendarioAgendamentoFindOneQueryResult => resultado !== null,
    );
  }

  private aplicarARaw(
    resultado: CalendarioAgendamentoFindOneQueryResult,
    visibilidade: CalendarioAgendamentoVisibilidade,
  ): CalendarioAgendamentoFindOneQueryResult | null {
    if (!this.temAlgumAcesso(visibilidade)) {
      return null;
    }

    if (this.podeVerDetalhes(visibilidade)) {
      return resultado;
    }

    return {
      ...resultado,
      nome: null,
      motivo: null,
      autorId: null,
      turmas: [],
      perfis: [],
      calendariosLetivos: [],
      ofertasFormacao: [],
      modalidades: [],
      diarios: [],
      detalhesOcultos: true,
    };
  }
}
