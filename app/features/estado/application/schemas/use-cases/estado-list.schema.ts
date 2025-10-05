import { EstadoFindOneByIdOutputDtoSchema } from "@/features";
import { Type } from "typebox";
import { ListQueryInputDtoSchema, ListQueryOutputDtoSchema } from "@/shared/application";

export const EstadoListInputDtoSchema = Type.Interface([ListQueryInputDtoSchema], {});

export const EstadoListOutputItemDtoSchema = EstadoFindOneByIdOutputDtoSchema;

export const EstadoListOutputDtoSchema = Type.Interface([ListQueryOutputDtoSchema], {
  data: Type.Array(EstadoListOutputItemDtoSchema),
});