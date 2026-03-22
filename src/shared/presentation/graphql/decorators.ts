import {
  ArgsType as _ArgsType,
  Field as _Field,
  InputType as _InputType,
  ObjectType as _ObjectType,
} from "@nestjs/graphql";
import { mixable } from "../mixable";

export const Field = mixable(_Field);
export const ObjectType = mixable(_ObjectType);
export const InputType = mixable(_InputType);
export const ArgsType = mixable(_ArgsType);

// Re-export types/values that are not decorators
export { ID, Int } from "@nestjs/graphql";
