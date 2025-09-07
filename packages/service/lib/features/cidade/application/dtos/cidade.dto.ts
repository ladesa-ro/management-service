import { Static } from "@sinclair/typebox";
import { CidadeSchema } from "@/features/cidade/application/schemas";
import { Estado } from "@/features/estado/domain/entities/estado.entity";

export type CidadeDto = Estado & Static<typeof CidadeSchema>;
