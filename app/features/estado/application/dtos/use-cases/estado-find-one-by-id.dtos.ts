import type { Type } from "typebox";
import type {
  EstadoFindOneByIdInputDtoSchema,
  EstadoFindOneByIdOutputDtoSchema
} from "../../schemas/use-cases/estado-find-one-by-id.schema";

export type EstadoFindOneByIdInputDto = Type.Static<typeof EstadoFindOneByIdInputDtoSchema>;

export type EstadoFindOneByIdOutputDto = Type.Static<typeof EstadoFindOneByIdOutputDtoSchema>;
