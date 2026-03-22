import type { AccessContext } from "@/server/access-context";
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
    accessContext: AccessContext | null,
    dto: EstagiarioListQuery | null,
    selection?: string[] | boolean | null,
  ): Promise<EstagiarioListQueryResult>;

  findById(
    accessContext: AccessContext | null,
    dto: EstagiarioFindOneQuery,
    selection?: string[] | boolean | null,
  ): Promise<EstagiarioFindOneQueryResult | null>;

  create(
    accessContext: AccessContext | null,
    dto: EstagiarioCreateCommand,
  ): Promise<EstagiarioFindOneQueryResult>;

  update(
    accessContext: AccessContext | null,
    id: string,
    dto: EstagiarioUpdateCommand,
  ): Promise<EstagiarioFindOneQueryResult>;

  delete(accessContext: AccessContext | null, id: string): Promise<void>;
}
