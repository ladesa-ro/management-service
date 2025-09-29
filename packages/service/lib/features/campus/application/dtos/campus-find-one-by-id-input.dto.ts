import { Static } from "@sinclair/typebox";
import { CampusFindOneByIdInputSchema } from "@/features/campus/application/schemas";

export type CampusFindOneByIdInputDto = Static<typeof CampusFindOneByIdInputSchema>;
