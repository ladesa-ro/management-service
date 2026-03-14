import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ModalidadeListInputDto, ModalidadeListOutputDto } from "../../application/dtos";

export type IModalidadeListQuery = {
  accessContext: AccessContext;
  dto: ModalidadeListInputDto | null;
  selection?: string[] | boolean;
};

export type IModalidadeListQueryHandler = IQueryHandler<
  IModalidadeListQuery,
  ModalidadeListOutputDto
>;
export const IModalidadeListQueryHandler = Symbol("IModalidadeListQueryHandler");
