import type { IAccessContext } from "@/domain/abstractions";
import type { EstagioCreateCommand, EstagioUpdateCommand } from "../commands";
import type {
  EstagioFindOneQuery,
  EstagioFindOneQueryResult,
  EstagioListQuery,
  EstagioListQueryResult,
} from "../queries";

export const IEstagioRepository = Symbol("IEstagioRepository");

export interface IEstagioRepository {
  findAll(
    accessContext: IAccessContext | null,
    dto: EstagioListQuery | null,
    selection?: string[] | boolean | null,
  ): Promise<EstagioListQueryResult>;

  findById(
    accessContext: IAccessContext | null,
    dto: EstagioFindOneQuery,
    selection?: string[] | boolean | null,
  ): Promise<EstagioFindOneQueryResult | null>;

  create(
    accessContext: IAccessContext | null,
    dto: EstagioCreateCommand,
  ): Promise<EstagioFindOneQueryResult>;

  update(
    accessContext: IAccessContext | null,
    id: string,
    dto: EstagioUpdateCommand,
  ): Promise<EstagioFindOneQueryResult>;

  delete(accessContext: IAccessContext | null, id: string): Promise<void>;
}
