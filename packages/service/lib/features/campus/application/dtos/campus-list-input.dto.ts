import { Static } from "@sinclair/typebox";
import { CampusListInputSchema } from "@/features/campus/application/schemas";

export type CampusListInputDto = Static<typeof CampusListInputSchema>;
