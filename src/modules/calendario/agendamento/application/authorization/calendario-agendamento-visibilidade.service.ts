import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { CalendarioColecaoAcessoResolverService } from "@/modules/calendario/colecao/application/calendario-colecao-acesso-resolver.service";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";

/**
 * Visibilidade efetiva de um agendamento para o requisitante.
 *
 * - SEM_RESTRICAO: agendamento sem coleção — comportamento de sempre, sem ACL.
 * - EDITOR/LEITOR/OCUPACAO: papel resolvido via ColecaoAcesso.
 * - SEM_ACESSO: agendamento tem coleção, mas nenhuma concessão alcança o requisitante.
 *
 * Única peça que sabe traduzir "colecaoId de um agendamento" em papel efetivo —
 * o permission checker (escrita) e os handlers de leitura consomem esta mesma
 * peça para nunca divergir sobre o que cada papel significa.
 */
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

  /**
   * Aplica visibilidade a um único resultado. Retorna null quando o requisitante
   * não tem acesso algum (o chamador deve tratar como "não encontrado", não
   * como um erro de permissão — evita confirmar a existência do registro pra
   * quem não pode vê-lo).
   */
  async aplicarVisibilidadeUm(
    accessContext: IAccessContext | null,
    resultado: CalendarioAgendamentoFindOneQueryResult,
  ): Promise<CalendarioAgendamentoFindOneQueryResult | null> {
    const colecaoId = resultado.colecao?.id ?? null;
    const visibilidade = await this.resolver(accessContext, colecaoId);

    return this.aplicarARaw(resultado, visibilidade);
  }

  /**
   * Aplica visibilidade a uma lista, removendo os itens sem acesso e reduzindo
   * os de papel OCUPACAO. Resolve o papel uma vez por coleção distinta presente
   * na lista, não uma vez por item, para não multiplicar consultas num resultado
   * com muitas ocorrências da mesma coleção.
   */
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

    // OCUPACAO: mesmo shape, campos sensíveis zerados — quem só sabe que o
    // horário está ocupado não precisa (nem deve) ver o que é o evento.
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
