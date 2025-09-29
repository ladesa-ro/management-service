import { Static } from "@sinclair/typebox";
import { CampusFindOneByIdRequestSchema } from "@/features/campus";

export type CampusFindOneByIdRequestDto = Static<typeof CampusFindOneByIdRequestSchema>;
