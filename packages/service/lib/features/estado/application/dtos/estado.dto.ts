import { Static } from "@sinclair/typebox";
import { EstadoSchema } from "@/features/estado";
import { Estado } from "@/features/estado/domain/entities/estado.entity";

export type EstadoDto = Estado & Static<typeof EstadoSchema>;
