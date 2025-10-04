import { Type } from "typebox";
import { EstadoDtoSchema } from "../entities";

export type EstadoFindOneByIdInputDto = Type.Static<typeof EstadoFindOneByIdInputDtoSchema>;
export const EstadoFindOneByIdInputDtoSchema = Type.Object(
  {
    id: Type.Index(EstadoDtoSchema, ["id"]),
  },
  {
    $id: "EstadoFindOneByIdInput",
  },
);

export type EstadoFindOneByIdOutputDto = Type.Static<typeof EstadoFindOneByIdOutputDtoSchema>;
export const EstadoFindOneByIdOutputDtoSchema = Type.Interface([EstadoDtoSchema], {
  $id: "EstadoFindOneByIdOutput",
});
