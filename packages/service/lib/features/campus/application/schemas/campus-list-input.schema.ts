import { CampusListSettings } from "@/features/campus/application/queries/campus-list.settings";
import { ListInputSchemaCustom, registerSchema } from "@/shared";

export const CampusListInputSchema = registerSchema("CampusListInput", ListInputSchemaCustom(CampusListSettings));
