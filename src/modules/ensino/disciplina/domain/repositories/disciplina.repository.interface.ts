import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type { IDisciplina } from "@/modules/ensino/disciplina";
import type { DisciplinaFindOneQueryResult, DisciplinaListQueryResult } from "../queries";
/**
 * Token de injeção para o repositório de Disciplina
 */
export const IDisciplinaRepository = Symbol("IDisciplinaRepository");

/**
 * Port de saída para operações de persistência de Disciplina
 * Estende a interface base de CRUD com operações padrão
 */
export type IDisciplinaRepository = IRepositoryFindAll<DisciplinaListQueryResult> &
  IRepositoryFindById<DisciplinaFindOneQueryResult> &
  IRepositoryCreate<IDisciplina> &
  IRepositoryUpdate<IDisciplina> &
  IRepositorySoftDelete;
