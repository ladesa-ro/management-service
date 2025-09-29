import { CampusFindOneByIdInputSchema } from "@/features/campus/application/schemas/campus-find-one-by-id-input.schema";
import { registerSchema } from "@/shared";

export const CampusDeleteOneByIdInputSchema = registerSchema("CampusDeleteOneByIdInput", CampusFindOneByIdInputSchema);
