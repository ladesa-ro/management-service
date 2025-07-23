import type { StandardSchemaV1 } from "@standard-schema/spec";
import Ajv from "ajv";
import { JsonSchema } from "../contracts/domain-contracts";
import type { DefinitionName, IValidationService } from "../di/contracts/abstract-validation-service.interface";
import { jit } from "../utils/jit";

export class ValidationServiceImpl implements IValidationService {

  getAjv = jit(() => {
    const ajv = new Ajv()
    ajv.addSchema(JsonSchema);
    return ajv;
  })


  async parseAndValidate<T = unknown>(ref: DefinitionName, input: unknown): Promise<StandardSchemaV1.Result<T>> {

    // const validate = ajv.compile({ $ref: `${JsonSchema.$id}#/$defs/${ref}` })

    return {
      issues: []
    }
  }
}