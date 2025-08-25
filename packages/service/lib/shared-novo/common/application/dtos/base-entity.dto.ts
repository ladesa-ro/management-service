import { Static, Type } from "@sinclair/typebox";
import { BaseEntity } from "@/shared-novo";

export const BaseEntitySchema = Type.Object(
  {},
  {
    additionalProperties: false,
  },
);

export type BaseEntityDto = BaseEntity & Static<typeof BaseEntitySchema>;
