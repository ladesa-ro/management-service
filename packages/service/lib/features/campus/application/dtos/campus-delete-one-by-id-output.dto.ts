import { Static } from "@sinclair/typebox";
import { CampusDeleteOneByIdOutputSchema } from "@/features/campus/application/schemas";

export type CampusDeleteOneByIdOutputDto = Static<typeof CampusDeleteOneByIdOutputSchema>;
