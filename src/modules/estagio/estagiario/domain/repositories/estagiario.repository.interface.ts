import type { IAccessContext } from "@/domain/abstractions";
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
    accessContext: IAccessContext | null,
    dto: EstagiarioListQuery | null,
  ): Promise<EstagiarioListQueryResult>;

  findById(
    accessContext: IAccessContext | null,
    dto: EstagiarioFindOneQuery,
  ): Promise<EstagiarioFindOneQueryResult | null>;

  create(
    accessContext: IAccessContext | null,
    dto: EstagiarioCreateCommand,
  ): Promise<EstagiarioFindOneQueryResult>;

  update(
    accessContext: IAccessContext | null,
    id: string,
    dto: EstagiarioUpdateCommand,
  ): Promise<EstagiarioFindOneQueryResult>;

  delete(accessContext: IAccessContext | null, id: string): Promise<void>;
}
