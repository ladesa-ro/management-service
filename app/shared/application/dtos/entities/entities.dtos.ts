import { Type } from "typebox";
import type { BaseEntity, BaseEntityDated, BaseEntityIdNumeric, BaseEntityIdUuid } from "../../../domain";
import {
  BaseEntityDatedDtoSchema,
  BaseEntityDtoSchema,
  BaseEntityIdNumericDtoSchema,
  BaseEntityIdUuidDtoSchema
} from "../../schemas/entities/entities.schemas.ts";

export type BaseEntityDto = Type.Static<typeof BaseEntityDtoSchema> & BaseEntity;

export type BaseEntityIdUuidDto = Type.Static<typeof BaseEntityIdUuidDtoSchema> & BaseEntityIdUuid;

export type BaseEntityIdNumericDto = Type.Static<typeof BaseEntityIdNumericDtoSchema> & BaseEntityIdNumeric;

export type BaseEntityDatedDto = Type.Static<typeof BaseEntityDatedDtoSchema> & BaseEntityDated;
