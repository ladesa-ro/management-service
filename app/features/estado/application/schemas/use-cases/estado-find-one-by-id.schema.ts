import { Type } from "typebox";
import { EstadoDtoSchema } from "@/features";

export const EstadoFindOneByIdInputDtoSchema = Type.Object(
  {
    id: Type.Index(EstadoDtoSchema, ["id"]),
  },
  {
    $id: "EstadoFindOneByIdInput",
  },
);

export const EstadoFindOneByIdOutputDtoSchema = Type.Interface(
  [EstadoDtoSchema],
  {},
  {
    $id: "EstadoFindOneByIdOutput",
  },
);
