import {
  ApiProperty as _ApiProperty,
  ApiPropertyOptional as _ApiPropertyOptional,
  ApiSchema as _ApiSchema,
} from "@nestjs/swagger";
import { RegisterModel as _RegisterModel } from "@/domain/abstractions/metadata/model-registry";
import { mixable } from "../mixable";

/**
 * Transforma o valor em array se ele nao for um array.
 * Note: This is now a no-op decorator. The actual transformation should be
 * handled at the application/service layer, not via class-transformer.
 */
function _TransformToArray(): PropertyDecorator {
  return () => {
    // no-op: class-transformer was removed
  };
}

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
} from "@/domain/abstractions/metadata/model-registry";
