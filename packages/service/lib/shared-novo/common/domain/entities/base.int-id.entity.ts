import { BaseEntity, ScalarIntId } from "@/shared-novo";

export type BaseIntIdEntity = BaseEntity & {
  id: ScalarIntId;
};
