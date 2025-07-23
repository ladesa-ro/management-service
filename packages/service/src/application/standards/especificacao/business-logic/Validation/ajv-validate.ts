import { getSpecNodesStore } from "@/application/standards/especificacao/business-logic/SpecNodesStore";
import { getAjvSpec } from "@/application/standards/especificacao/business-logic/Validation/AjvSpec";
import { ValidationFailedException } from "@/application/standards/exceptions";
import { DefinedError } from "ajv";
import { JSONSchema7 } from "json-schema";

type IValidatorResult<Data = any> =
  | {
      success: true;
      data: Data;
      errors: null;
    }
  | {
      success: false;
      data: null;
      errors: DefinedError[];
    };

export type IValidator<Data = any> = (data: any) => Promise<IValidatorResult<Data>>;

export const makeValidator = async <Data = any>(jsonSchema: JSONSchema7): Promise<IValidator<Data>> => {
  const ajvSpec = await getAjvSpec();

  const validate = ajvSpec.compile<Data>(jsonSchema);

  return async (data: any): Promise<IValidatorResult<Data>> => {
    const clone = structuredClone(data);

    const valid = await Promise.resolve(validate(clone));

    if (valid) {
      return {
        success: true,
        data: clone,
        errors: null,
      };
    } else {
      const errors = validate.errors as DefinedError[];

      return {
        success: false,
        data: null,
        errors: errors,
      };
    }
  };
};

const validatorsCache = new Map();

export const makeCachedValidator = async <Data = any>(key: string | Symbol, jsonSchema: JSONSchema7): Promise<IValidator<Data>> => {
  if (!validatorsCache.has(key)) {
    const validator = await makeValidator(jsonSchema);
    validatorsCache.set(key, validator);
  }

  const validator = validatorsCache.get(key) as IValidator<Data>;
  return validator;
};

export const makeValidatorForEntity = async <Data>(token: string) => {
  const store = getSpecNodesStore();

  const node = store.GetEntityNode(token);

  return makeCachedValidator<Data>(token, node);
};

export const ensureValidResult = <Data>(result: IValidatorResult<Data>) => {
  if (result.success) {
    return result.data;
  } else {
    throw new ValidationFailedException(result.errors);
  }
};
