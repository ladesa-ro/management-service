import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EtapaFindOneInputDto, EtapaFindOneOutputDto } from "../../application/dtos";

export type IEtapaFindOneQuery = {
  accessContext: AccessContext | null;
  dto: EtapaFindOneInputDto;
  selection?: string[] | boolean;
};

export type IEtapaFindOneQueryHandler = IQueryHandler<
  IEtapaFindOneQuery,
  EtapaFindOneOutputDto | null
>;
export const IEtapaFindOneQueryHandler = Symbol("IEtapaFindOneQueryHandler");
