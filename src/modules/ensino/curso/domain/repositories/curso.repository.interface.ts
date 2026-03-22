import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type { ICurso } from "@/modules/ensino/curso";
import type { CursoFindOneQueryResult, CursoListQueryResult } from "../queries";
/**
 * Token de injeção para o repositório de Curso
 */
export const ICursoRepository = Symbol("ICursoRepository");

/**
 * Port de saída para operações de persistência de Curso
 * Estende a interface base de CRUD com operações padrão
 */
export type ICursoRepository = IRepositoryFindAll<CursoListQueryResult> &
  IRepositoryFindById<CursoFindOneQueryResult> &
  IRepositoryCreate<ICurso> &
  IRepositoryUpdate<ICurso> &
  IRepositorySoftDelete;
