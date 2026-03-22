import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type { IDiario } from "@/modules/ensino/diario";
import type { DiarioFindOneQueryResult, DiarioListQueryResult } from "../queries";
/**
 * Token de injeção para o repositório de Diario
 */
export const IDiarioRepository = Symbol("IDiarioRepository");

/**
 * Port de saída para operações de persistência de Diario
 * Estende a interface base de CRUD com operações padrão
 */
export type IDiarioRepository = IRepositoryFindAll<DiarioListQueryResult> &
  IRepositoryFindById<DiarioFindOneQueryResult> &
  IRepositoryCreate<IDiario> &
  IRepositoryUpdate<IDiario> &
  IRepositorySoftDelete;
