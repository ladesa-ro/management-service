import { Static } from "@sinclair/typebox";
import { CampusDeleteOneByIdInputSchema } from "@/features/campus/application/schemas";

export type CampusDeleteOneByIdInputDto = Static<typeof CampusDeleteOneByIdInputSchema>;
