import { Static } from "@sinclair/typebox";

import { CidadeFindOneByIdInputSchema, CidadeFindOneByIdOutputSchema } from "@/features/cidade/application/schemas";

export type CidadeFindOneByIdInputDto = Static<typeof CidadeFindOneByIdInputSchema>;

export type CidadeFindOneByIdOutputDto = Static<typeof CidadeFindOneByIdOutputSchema>;
