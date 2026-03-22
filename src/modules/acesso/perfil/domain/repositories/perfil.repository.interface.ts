import type { IRepositoryCreate, IRepositoryUpdate } from "@/domain/abstractions";
import type { AccessContext } from "@/server/access-context";
import type { PerfilFindOneQueryResult, PerfilListQuery, PerfilListQueryResult } from "../queries";

export const IPerfilRepository = Symbol("IPerfilRepository");

export type IPerfilRepository = IRepositoryCreate<Record<string, any>> &
  IRepositoryUpdate<Record<string, any>> & {
    findAll(
      accessContext: AccessContext | null,
      dto: PerfilListQuery | null,
    ): Promise<PerfilListQueryResult>;

    findById(
      accessContext: AccessContext | null,
      dto: { id: string | number },
    ): Promise<PerfilFindOneQueryResult | null>;

    findAllActiveByUsuarioId(
      accessContext: AccessContext | null,
      usuarioId: string,
    ): Promise<PerfilFindOneQueryResult[]>;

    findByUsuarioAndCampus(
      usuarioId: string,
      campusId: string,
    ): Promise<PerfilFindOneQueryResult[]>;

    deactivateByIds(ids: string[]): Promise<void>;
  };
