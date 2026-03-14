import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EtapaListInputDto, EtapaListOutputDto } from "../../application/dtos";

export type IEtapaListQuery = {
  accessContext: AccessContext;
  dto: EtapaListInputDto | null;
  selection?: string[] | boolean;
};

export type IEtapaListQueryHandler = IQueryHandler<IEtapaListQuery, EtapaListOutputDto>;
export const IEtapaListQueryHandler = Symbol("IEtapaListQueryHandler");
