import {
  ApiProperty as _ApiProperty,
  ApiPropertyOptional as _ApiPropertyOptional,
  ApiSchema as _ApiSchema,
} from "@nestjs/swagger";
import { RegisterModel as _RegisterModel } from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import { TransformToArray as _TransformToArray } from "@/modules/@shared/infrastructure/presentation/rest/dtos/to-array.transform";
import { mixable } from "../mixable";

export const ApiProperty = mixable(_ApiProperty);
export const ApiPropertyOptional = mixable(_ApiPropertyOptional);
export const ApiSchema = mixable(_ApiSchema);
export const RegisterModel = mixable(_RegisterModel);
export const TransformToArray = mixable(_TransformToArray);

// Re-export utilities that are not decorators
export { PartialType } from "@nestjs/swagger";
export {
  commonProperties,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
