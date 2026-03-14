import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ModalidadeFindOneInputDto, ModalidadeFindOneOutputDto } from "../../application/dtos";

export type IModalidadeFindOneQuery = {
  accessContext: AccessContext | null;
  dto: ModalidadeFindOneInputDto;
  selection?: string[] | boolean;
};

export type IModalidadeFindOneQueryHandler = IQueryHandler<
  IModalidadeFindOneQuery,
  ModalidadeFindOneOutputDto | null
>;
export const IModalidadeFindOneQueryHandler = Symbol("IModalidadeFindOneQueryHandler");
