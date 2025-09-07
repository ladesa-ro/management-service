import { Static } from "@sinclair/typebox";
import { EstadoListRequestSchema } from "@/features/estado";

export type EstadoListRequestDto = Static<typeof EstadoListRequestSchema>;
