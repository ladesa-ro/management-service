import { CampusListInputSchema, CampusListSettings } from "@/features/campus";
import { getListRequestSchema } from "@/shared";

export const CampusListRequestSchema = getListRequestSchema(CampusListInputSchema, CampusListSettings);
