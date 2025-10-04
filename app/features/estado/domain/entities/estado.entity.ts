import type { BaseEntityIdNumeric } from "../../../../shared";

export type EstadoEntity = BaseEntityIdNumeric & {
  nome: string;
  sigla: string;
};
