import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { JsonSchema } from "../../contracts/domain-contracts";

export type DefinitionName = keyof JsonSchema["$defs"]

export interface IValidationService {
  parseAndValidate<T = unknown>(ref: DefinitionName, input: unknown): Promise<StandardSchemaV1.Result<T>>;
}