import { Static } from "@sinclair/typebox";
import { CidadeFindOneByIdRequestSchema } from "@/features/cidade";

export type CidadeFindOneByIdRequestDto = Static<typeof CidadeFindOneByIdRequestSchema>;
