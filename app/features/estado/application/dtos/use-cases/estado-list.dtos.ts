import type { Type } from "typebox";
import type { EstadoListInputDtoSchema, EstadoListOutputDtoSchema } from "@/features";

export type EstadoListInputDto = Type.Static<typeof EstadoListInputDtoSchema>;

export type EstadoListOutputItemDto = Type.Static<typeof EstadoListOutputDtoSchema>;

export type EstadoListOutputDto = Type.Static<typeof EstadoListOutputDtoSchema>;
