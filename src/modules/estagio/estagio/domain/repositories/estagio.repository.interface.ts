import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
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
    accessContext: AccessContext | null,
    dto: EstagioListQuery | null,
    selection?: string[] | boolean | null,
  ): Promise<EstagioListQueryResult>;

  findById(
    accessContext: AccessContext | null,
    dto: EstagioFindOneQuery,
    selection?: string[] | boolean | null,
  ): Promise<EstagioFindOneQueryResult | null>;

  create(
    accessContext: AccessContext | null,
    dto: EstagioCreateCommand,
  ): Promise<EstagioFindOneQueryResult>;

  update(
    accessContext: AccessContext | null,
    id: string,
    dto: EstagioUpdateCommand,
  ): Promise<EstagioFindOneQueryResult>;

  delete(accessContext: AccessContext | null, id: string): Promise<void>;
}
