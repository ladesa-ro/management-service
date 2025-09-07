import { Static } from "@sinclair/typebox";
import { EstadoFindOneByIdInputSchema, EstadoFindOneByIdOutputSchema } from "@/features/estado";

export type EstadoFindOneByIdInputDto = Static<typeof EstadoFindOneByIdInputSchema>;

export type EstadoFindOneByIdOutputDto = Static<typeof EstadoFindOneByIdOutputSchema>;
