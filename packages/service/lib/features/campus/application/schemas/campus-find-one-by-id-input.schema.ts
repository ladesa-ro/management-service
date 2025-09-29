import { CampusSchema } from "@/features/campus/application/schemas/campus.schema";
import { FindOneByIdInputSchemaCustom, registerSchema } from "@/shared";

export const CampusFindOneByIdInputSchema = registerSchema("CampusFindOneByIdInput", FindOneByIdInputSchemaCustom(CampusSchema));
