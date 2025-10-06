import type { ValidateFunction } from "ajv/lib/types";
import type { Static, TSchema } from "typebox";
import { BaseApplicationError, BaseValidationFailedError } from "@/shared";
import { lazyAsync } from "@/shared/infrastructure/utils/lazy.ts";

const getAjv = lazyAsync(async () => {
  const { default: Ajv } = await import("ajv");

  let ajv = new Ajv({ useDefaults: true, coerceTypes: "array" });

  const { default: addFormats } = (await import("ajv-formats")) as any;

  ajv = addFormats(ajv, ["date-time", "time", "date", "email", "hostname", "ipv4", "ipv6", "uri", "uri-reference", "uuid", "uri-template", "json-pointer", "relative-json-pointer", "regex"]);
  ajv.addKeyword("$anchor");

  return ajv;
});

const compiledSchemasValidators = new Map<TSchema, ValidateFunction<any>>();

const compileOrGetValidator = async (schema: TSchema): Promise<ValidateFunction<any>> => {
  let compiledValidator: ValidateFunction<any> | undefined;

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
    console.debug(schema.properties.query);
    throw new BaseValidationFailedError(validator.errors);
  }

  if (!result) throw new BaseApplicationError("Erro desconhecido");

  return dtoClone;
};
