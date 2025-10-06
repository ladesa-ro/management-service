import type { EstadoFindOneByIdInputSchema, EstadoFindOneByIdOutputSchema } from "@/features/estado/application/schemas";
import type { AppSchemaType } from "@/shared/infrastructure/schemas/registry/app-schema.ts";

export type EstadoFindOneByIdInputDto = AppSchemaType<typeof EstadoFindOneByIdInputSchema>;

export type EstadoFindOneByIdOutputDto = AppSchemaType<typeof EstadoFindOneByIdOutputSchema>;
