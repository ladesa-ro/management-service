import { EstadoListInputSchema, EstadoListSettings } from "@/features/estado";
import { getListRequestSchema } from "@/shared";

export const EstadoListRequestSchema = getListRequestSchema(EstadoListInputSchema, EstadoListSettings);
