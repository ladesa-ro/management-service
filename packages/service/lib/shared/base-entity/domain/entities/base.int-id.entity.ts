import { BaseEntity, ScalarIntId } from "@/shared";

export type BaseIntIdEntity = BaseEntity & {
  id: ScalarIntId;
};
