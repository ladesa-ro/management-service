import { Static } from "@sinclair/typebox";
import { CampusUpdateOneByIdRequestSchema } from "@/features/campus";

export type CampusUpdateOneByIdRequestDto = Static<typeof CampusUpdateOneByIdRequestSchema>;
