import { BaseEntity, ScalarUuid } from "@/shared";

export type BaseUuidEntity = BaseEntity & {
  id: ScalarUuid;
};
