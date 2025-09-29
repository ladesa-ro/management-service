import { Static } from "@sinclair/typebox";
import { CampusListOutputItemSchema } from "@/features/campus/application/schemas";

export type CampusListOutputItemDto = Static<typeof CampusListOutputItemSchema>;
