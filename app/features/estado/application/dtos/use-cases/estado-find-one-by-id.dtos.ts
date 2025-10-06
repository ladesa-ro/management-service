import type { Type } from "typebox";
import type { EstadoFindOneByIdInputDtoSchema, EstadoFindOneByIdOutputDtoSchema } from "@/features/estado/application/schemas";

export type EstadoFindOneByIdInputDto = Type.Static<typeof EstadoFindOneByIdInputDtoSchema>;

export type EstadoFindOneByIdOutputDto = Type.Static<typeof EstadoFindOneByIdOutputDtoSchema>;
