import { Static } from "@sinclair/typebox";
import { CampusSchema } from "@/features/campus/application/schemas";
import { Campus } from "@/features/campus/domain";

export type CampusDto = Campus & Static<typeof CampusSchema>;
