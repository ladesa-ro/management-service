import { Static } from "@sinclair/typebox";
import { CidadeListRequestSchema } from "@/features/cidade";

export type CidadeListRequestDto = Static<typeof CidadeListRequestSchema>;
