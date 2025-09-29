import { Static } from "@sinclair/typebox";
import { CampusListOutputSchema } from "@/features/campus/application/schemas";

export type CampusListOutputDto = Static<typeof CampusListOutputSchema>;
