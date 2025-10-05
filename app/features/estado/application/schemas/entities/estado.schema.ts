import { Type } from "typebox";
import { BaseEntityIdNumericDtoSchema } from "../../../../../shared";

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
