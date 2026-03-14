import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DiarioPreferenciaAgrupamentoListInputDto,
  DiarioPreferenciaAgrupamentoListOutputDto,
} from "../../application/dtos";

export type IDiarioPreferenciaAgrupamentoListQuery = {
  accessContext: AccessContext;
  dto: DiarioPreferenciaAgrupamentoListInputDto | null;
  selection?: string[] | boolean;
};

export type IDiarioPreferenciaAgrupamentoListQueryHandler = IQueryHandler<
  IDiarioPreferenciaAgrupamentoListQuery,
  DiarioPreferenciaAgrupamentoListOutputDto
>;
export const IDiarioPreferenciaAgrupamentoListQueryHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoListQueryHandler",
);
