import { type TSchema, Type } from "typebox";
import type { SchemaId } from "./schema-id";

const schemas = new Map<string, TSchema>();

export type registerSchema = {
  /**
   * Register a schema with a name
   * @param name
   * @param schema
   */ <T = TSchema>(name: SchemaId, schema: T): T;

  /**
   * @deprecated use registerSchema passing SchemaId
   */ <T = TSchema>(name: Exclude<string, SchemaId>, schema: T): T;
};

export const registerSchema: registerSchema = (name: SchemaId | string, schema: TSchema) => {
  const schemaWithId = Type.Evaluate(schema, {
    $id: name,
  });

  if (schemas.has(name)) {
    throw new Error(`Schema ${name} already registered`);
  }

  schemas.set(name, schemaWithId);

  return schemaWithId;
};

export const getSchemaById = (id: string) => {
  const schema = schemas.get(id) || schemas.get(id.replace(/^#/, ""));

  if (!schema) {
    throw new Error(`Schema ${id} not registered`);
  }

  return schema;
};

export const getSchemas = () => {
  return Object.fromEntries(
    Object.entries(Object.fromEntries(schemas)).map(([key, schema]) => [
      key,
      {
        $anchor: schema.$id,
        ...schema,
      },
    ]),
  );
};

export const getSchemaId = <T extends TSchema>(factory: () => T) => {
  const { $id } = factory();

  if (!$id) throw new Error("SchemaId not found");
  if (!schemas.has($id)) throw new Error(`Schema ${$id} not registered`);

  return $id as SchemaId;
};

export const makeReference = <T extends TSchema>(factory: () => T) => {
  return Type.Ref(`#${getSchemaId(factory)}`);
};
