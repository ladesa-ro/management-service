import { type TSchema, Type } from "typebox";
import { Injectable } from "@/shared";
import type { AppSchema, AppSchemaEvaluateContext } from "@/shared/infrastructure/schemas/registry/app-schema.ts";
import { PrimitiveError } from "@/shared/primitives";

@Injectable("Singleton")
export class SchemaRegistry {
  private appSchemas = new Map<AppSchema, { schema: TSchema }>();
  private schemas = new Map<string, TSchema>();

  getSchemaById(id: string) {
    const schemaCache = this.schemas.get(id);

    if (!schemaCache) {
      return null;
    }

    return schemaCache;
  }

  getSchemaByIdStrict(id: string) {
    const schemaCache = this.getSchemaById(id);

    if (!schemaCache) {
      throw new PrimitiveError(`Schema not found: ${id}`);
    }

    return schemaCache;
  }

  getSchema<A extends AppSchema>(appSchema: A) {
    const id = appSchema.id;

    if (id) {
      const schemaCache = this.getSchemaById(id);

      if (schemaCache) {
        return schemaCache as ReturnType<A["getSchema"]>;
      }
    }

    const appSchemaCache = this.appSchemas.get(appSchema);

    if (appSchemaCache) {
      return appSchemaCache.schema as ReturnType<A["getSchema"]>;
    }

    const context: AppSchemaEvaluateContext = {
      makeReference: <A extends AppSchema>(referencedAppSchema: A) => {
        if (referencedAppSchema.id) {
          return Type.Ref(referencedAppSchema.id);
        }

        return Type.Never();
      },
      getSchema: <A extends AppSchema>(appSchema: A) => {
        return this.getSchema(appSchema);
      },
    };

    const schema = appSchema.getSchema(context) as ReturnType<A["getSchema"]>;

    if (id) {
      Object.assign(schema, { $id: id });
      this.schemas.set(id, schema);
    }

    this.appSchemas.set(appSchema, { schema });

    return schema;
  }
}
