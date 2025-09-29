import { Static } from "@sinclair/typebox";
import { CampusListRequestSchema } from "@/features/campus";

export type CampusListRequestDto = Static<typeof CampusListRequestSchema>;
