import { Type } from "typebox";
import { BaseEntityIdNumericDtoSchema } from "../../../../../shared";
import type { EstadoEntity } from "../../../domain";

export type EstadoDto = Type.Static<typeof EstadoDtoSchema> & EstadoEntity;

export const EstadoDtoSchema = Type.Interface(
  [BaseEntityIdNumericDtoSchema],
  {
    nome: Type.String(),
    sigla: Type.String(),
  },
  {
    $id: "Estado",
  },
);
