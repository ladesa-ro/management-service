import { CampusListSettings } from "@/features/campus/application/queries/campus-list.settings";
import { CampusListOutputItemSchema } from "@/features/campus/application/schemas/campus-list-output-item.schema";
import { ListOutputSchemaCustom, makeReference, registerSchema } from "@/shared";

export const CampusListOutputSchema = registerSchema(
  "CampusListOutput",
  ListOutputSchemaCustom(
    makeReference(() => CampusListOutputItemSchema),
    CampusListSettings,
  ),
);
