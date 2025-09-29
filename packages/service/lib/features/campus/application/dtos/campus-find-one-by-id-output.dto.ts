import { Static } from "@sinclair/typebox";
import { CampusFindOneByIdOutputSchema } from "@/features/campus/application/schemas";

export type CampusFindOneByIdOutputDto = Static<typeof CampusFindOneByIdOutputSchema>;
