import { Static } from "@sinclair/typebox";
import { CampusCreateRequestSchema } from "@/features/campus";

export type CampusCreateRequestDto = Static<typeof CampusCreateRequestSchema>;
