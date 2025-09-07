import { Static } from "@sinclair/typebox";
import { EstadoFindOneByIdRequestSchema } from "@/features/estado";

export type EstadoFindOneByIdRequestDto = Static<typeof EstadoFindOneByIdRequestSchema>;
