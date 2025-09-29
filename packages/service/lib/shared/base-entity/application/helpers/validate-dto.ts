import { Static, TSchema } from "@sinclair/typebox";
import type { ValidateFunction } from "ajv/lib/types";
import { lazyAsync } from "@/infrastructure-antigo/utils/lazy";
import { BaseApplicationError, BaseValidationFailedError } from "@/shared";

const getAjv = lazyAsync(async () => {
  const {default: Ajv} = await import("ajv");

  let ajv = new Ajv({useDefaults: true, coerceTypes: "array"});

  const {default: addFormats} = (await import("ajv-formats")) as any;

  ajv = addFormats(ajv, ["date-time", "time", "date", "email", "hostname", "ipv4", "ipv6", "uri", "uri-reference", "uuid", "uri-template", "json-pointer", "relative-json-pointer", "regex"]);
  ajv.addKeyword("$anchor");

  return ajv;
});

const compiledSchemasValidators = new Map<TSchema, ValidateFunction<any>>();

const compileOrGetValidator = async (schema: TSchema): Promise<ValidateFunction<any>> => {
  let compiledValidator;

  compiledValidator = compiledSchemasValidators.get(schema);

  if (compiledValidator) {
    return compiledValidator;
  }

  const ajv = await getAjv();
  compiledValidator = ajv.compile(schema);
  compiledSchemasValidators.set(schema, compiledValidator);

  return compiledValidator;
};

export const validateDto = async <Schema extends TSchema>(schema: Schema, dto: unknown): Promise<Static<Schema>> => {
  const validator = await compileOrGetValidator(schema);

  const dtoClone = structuredClone(dto);

  const result = validator(dtoClone);
  if (validator.errors) {
    throw new BaseValidationFailedError(validator.errors);
  }

  if (!result) throw new BaseApplicationError("Erro desconhecido");

  return dtoClone;
};
