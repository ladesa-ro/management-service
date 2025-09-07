import { CidadeListSettings } from "@/features/cidade/application/queries/cidade-list.settings";
import { CidadeListInputSchema } from "@/features/cidade/application/schemas/cidade-list.schema";
import { getListRequestSchema } from "@/shared";

export const CidadeListRequestSchema = getListRequestSchema(CidadeListInputSchema, CidadeListSettings);
