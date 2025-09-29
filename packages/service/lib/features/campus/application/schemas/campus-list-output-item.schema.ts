import {
  CampusFindOneByIdOutputSchema
} from "@/features/campus/application/schemas/campus-find-one-by-id-output.schema";
import { registerSchema } from "@/shared";

export const CampusListOutputItemSchema = registerSchema("CampusListOutputItem", CampusFindOneByIdOutputSchema);
