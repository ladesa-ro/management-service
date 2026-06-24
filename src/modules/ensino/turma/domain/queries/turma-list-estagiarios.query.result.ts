import type { EstagiarioFindOneQueryResult } from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.result";
import type { EstagioFindOneQueryResult } from "@/modules/estagio/estagio/domain/queries/estagio-find-one.query.result";

/**
 * Representa um item da listagem: um estagiário e seus estágios associados.
 *
 * estagios = [] quando o estagiário não possui nenhum estágio cadastrado.
 * estagios tem múltiplos itens quando o estagiário possui histórico de estágios
 * (ex: encerrado + ativo, rescindido + em fase inicial, etc.).
 */
export class TurmaEstagiarioItem {
  estagiario!: EstagiarioFindOneQueryResult;
  estagios!: EstagioFindOneQueryResult[];
}

/**
 * Resultado da query TurmaListEstagiarios.
 *
 * Retorna a lista plana de pares (estagiario, estagios) para todos os
 * estagiários que compartilham curso.id e periodo com a turma solicitada.
 */
export class TurmaListEstagiariosQueryResult {
  items!: TurmaEstagiarioItem[];
}
