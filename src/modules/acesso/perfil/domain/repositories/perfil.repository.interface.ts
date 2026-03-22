import type { IAccessContext, IRepositoryCreate, IRepositoryUpdate } from "@/domain/abstractions";
import type { PerfilFindOneQueryResult, PerfilListQuery, PerfilListQueryResult } from "../queries";

export const IPerfilRepository = Symbol("IPerfilRepository");

export type IPerfilRepository = IRepositoryCreate<Record<string, unknown>> &
  IRepositoryUpdate<Record<string, unknown>> & {
    findAll(
      accessContext: IAccessContext | null,
      dto: PerfilListQuery | null,
    ): Promise<PerfilListQueryResult>;

    findById(
      accessContext: IAccessContext | null,
      dto: { id: string | number },
    ): Promise<PerfilFindOneQueryResult | null>;

    findAllActiveByUsuarioId(
      accessContext: IAccessContext | null,
      usuarioId: string,
    ): Promise<PerfilFindOneQueryResult[]>;

    findByUsuarioAndCampus(
      usuarioId: string,
      campusId: string,
    ): Promise<PerfilFindOneQueryResult[]>;

    deactivateByIds(ids: string[]): Promise<void>;
  };
