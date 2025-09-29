import { Static } from "@sinclair/typebox";
import { CampusCreateInputDto, CampusFindOneByIdInputDto } from "@/features/campus/application";
import { CampusUpdateOneByIdInputSchema } from "@/features/campus/application/schemas";

export type CampusUpdateOneByIdInputDto = Static<typeof CampusUpdateOneByIdInputSchema> & {
  targetEntity: CampusFindOneByIdInputDto;
  data: Partial<CampusCreateInputDto>;
};
