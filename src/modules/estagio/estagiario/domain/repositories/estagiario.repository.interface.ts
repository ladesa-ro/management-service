import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { EstagiarioCreateCommand, EstagiarioUpdateCommand } from "../commands";
import type {
  EstagiarioFindOneQuery,
  EstagiarioFindOneQueryResult,
  EstagiarioListQuery,
  EstagiarioListQueryResult,
} from "../queries";
/**
 * Symbol para injetar a porta de repositório
 */
export const IEstagiarioRepository = Symbol("IEstagiarioRepository");

/**
 * Interface da porta de repositório
 */
export interface IEstagiarioRepository {
  findAll(
    accessContext: AccessContext,
    dto: EstagiarioListQuery | null,
    selection?: string[] | boolean,
  ): Promise<EstagiarioListQueryResult>;

  findById(
    accessContext: AccessContext | null,
    dto: EstagiarioFindOneQuery,
    selection?: string[] | boolean,
  ): Promise<EstagiarioFindOneQueryResult | null>;

  create(
    accessContext: AccessContext,
    dto: EstagiarioCreateCommand,
  ): Promise<EstagiarioFindOneQueryResult>;

  update(
    accessContext: AccessContext,
    id: string,
    dto: EstagiarioUpdateCommand,
  ): Promise<EstagiarioFindOneQueryResult>;

  delete(accessContext: AccessContext, id: string): Promise<void>;
}
