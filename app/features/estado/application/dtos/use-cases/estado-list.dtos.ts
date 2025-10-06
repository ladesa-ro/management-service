import type { EstadoListInputDtoSchema, EstadoListOutputDtoSchema } from "@/features";
import type { AppSchemaType } from "@/shared/infrastructure/schemas/registry/app-schema.ts";

export type EstadoListInputDto = AppSchemaType<typeof EstadoListInputDtoSchema>;

export type EstadoListOutputItemDto = AppSchemaType<typeof EstadoListOutputDtoSchema>;

export type EstadoListOutputDto = AppSchemaType<typeof EstadoListOutputDtoSchema>;
