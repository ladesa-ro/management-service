import { BaseEntity, ScalarUuid } from "@/shared-novo";

export type BaseUuidEntity = BaseEntity & {
  id: ScalarUuid;
};
