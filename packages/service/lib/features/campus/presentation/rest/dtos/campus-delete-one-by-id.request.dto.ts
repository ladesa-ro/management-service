import { Static } from "@sinclair/typebox";
import { CampusDeleteOneByIdRequestSchema } from "@/features/campus";

export type CampusDeleteOneByIdRequestDto = Static<typeof CampusDeleteOneByIdRequestSchema>;
