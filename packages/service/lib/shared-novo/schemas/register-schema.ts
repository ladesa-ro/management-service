import { TSchema, Type } from "@sinclair/typebox";
import { SchemaId } from "@/shared-novo";

const schemas = new Map<string, TSchema>();

export type registerSchema = {
  /**
   * Register a schema with a name
   * @param name
   * @param schema
   */<T = TSchema>(name: SchemaId, schema: T): T;

  /**
   * @deprecated use registerSchema passing SchemaId
   */<T = TSchema>(name: Exclude<string, SchemaId>, schema: T): T;
};

export const registerSchema: registerSchema = (name: SchemaId | string, schema: TSchema) => {
  const schemaWithId = Type.Composite([schema], {
    $id: name,
  });

  if (schemas.has(name)) {
    throw new Error(`Schema ${name} already registered`);
  }

  schemas.set(name, schemaWithId);

  return schemaWithId;
};

export const getSchema = (name: string) => {
  if (!schemas.has(name)) {
    throw new Error(`Schema ${name} not registered`);
  }

  return schemas.get(name);
};

export const getSchemas = () => Object.fromEntries(schemas);

export const getSchemaId = <T extends TSchema>(factory: () => T) => {
  const {$id} = factory();

  if (!$id) throw new Error("SchemaId not found");
  if (!schemas.has($id)) throw new Error(`Schema ${$id} not registered`);

  return $id as SchemaId;
};

export const makeReference = <T extends TSchema>(factory: () => T) => {
  return Type.Ref(getSchemaId(factory));
};

export const makeOpenApiReference = <T extends TSchema>(factory: () => T) => {
  return {
    $ref: `#/components/schemas/${getSchemaId(factory)}`,
  };
};
