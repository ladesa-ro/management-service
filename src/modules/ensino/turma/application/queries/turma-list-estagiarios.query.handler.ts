import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ITurmaListEstagiariosQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-list-estagiarios.query.handler.interface";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario/domain/repositories";
import { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import type {
  TurmaEstagiarioItem,
  TurmaListEstagiariosQuery,
  TurmaListEstagiariosQueryResult,
} from "../../domain/queries";
import { ITurmaRepository } from "../../domain/repositories";
import { Turma } from "../../domain/turma";

/**
 * Handler responsável por listar todos os estagiários de uma turma e seus
 * respectivos estágios.
 *
 * A associação Turma ↔ Estagiário é inferida por (curso.id + periodo),
 * uma vez que não existe FK direta entre as entidades no modelo atual.
 *
 * Fluxo:
 * 1. Busca a turma pelo ID — lança ResourceNotFoundError se não existir.
 * 2. Busca todos os estagiários com o mesmo (curso.id, periodo) da turma.
 * 3. Para cada estagiário, busca seus estágios em paralelo (Promise.all).
 * 4. Retorna o resultado composto.
 *
 * Performance: O N+1 de queries de estágios é mitigado via Promise.all.
 * Para volumes grandes, considerar implementar findByEstagiarioIds em
 * IEstagioRepository para consolidar em uma única query IN.
 */
@Impl()
export class TurmaListEstagiariosQueryHandlerImpl implements ITurmaListEstagiariosQueryHandler {
  constructor(
    @Dep(ITurmaRepository)
    private readonly turmaRepository: ITurmaRepository,
    @Dep(IEstagiarioRepository)
    private readonly estagiarioRepository: IEstagiarioRepository,
    @Dep(IEstagioRepository)
    private readonly estagioRepository: IEstagioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: TurmaListEstagiariosQuery,
  ): Promise<TurmaListEstagiariosQueryResult> {
    // Etapa 1: Busca a turma para extrair curso.id e periodo
    const turma = await this.turmaRepository.getFindOneQueryResult(accessContext, { id: dto.id });
    ensureExists(turma, Turma.entityName, dto.id);

    // Etapa 2: Busca estagiários filtrados pelo curso e período da turma
    const estagiarioListResult = await this.estagiarioRepository.getFindAllQueryResult(
      accessContext,
      {
        "filter.curso.id": `$eq:${turma.curso.id}`,
        "filter.periodo": `$eq:${turma.periodo}`,
        limit: 200,
        page: 1,
      } as any,
    );

    const estagiarios = estagiarioListResult.data;

    // Etapa 3: Para cada estagiário, busca seus estágios em paralelo
    const items: TurmaEstagiarioItem[] = await Promise.all(
      estagiarios.map(async (estagiario) => {
        const estagioListResult = await this.estagioRepository.getFindAllQueryResult(
          accessContext,
          {
            filterEstagiarioId: [estagiario.id],
            limit: 50,
            page: 1,
          } as any,
        );

        return {
          estagiario,
          estagios: estagioListResult.data,
        };
      }),
    );

    return { items };
  }
}
