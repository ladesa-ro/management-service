import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DiarioPreferenciaAgrupamentoFindOneInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
} from "../../application/dtos";

export type IDiarioPreferenciaAgrupamentoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: DiarioPreferenciaAgrupamentoFindOneInputDto;
  selection?: string[] | boolean;
};

export type IDiarioPreferenciaAgrupamentoFindOneQueryHandler = IQueryHandler<
  IDiarioPreferenciaAgrupamentoFindOneQuery,
  DiarioPreferenciaAgrupamentoFindOneOutputDto | null
>;
export const IDiarioPreferenciaAgrupamentoFindOneQueryHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoFindOneQueryHandler",
);
