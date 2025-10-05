import { merge } from "allof-merge";
import type { JSONSchema7Object } from "json-schema";
import { type TObject, type TSchema, Type } from "typebox";
import { getSchemaById } from "../../schemas";

const resolveSchema = (schema: TSchema | JSONSchema7Object): "literal" | string[] => {
  const processedSchema = merge(Type.Evaluate(schema)) as JSONSchema7Object;

  const ref = processedSchema.$ref;

  if (ref && typeof ref === "string") {
    return resolveSchema(getSchemaById(ref));
  } else if (schema.type === "object") {
    const properties: string[] = [];

    for (const property of Object.entries(processedSchema.properties ?? {})) {
      const [key, value] = property;

      const resolvedPropertyValue = resolveSchema(value);

      if (Array.isArray(resolvedPropertyValue)) {
        for (const resolvedProperty of resolvedPropertyValue) {
          properties.push(`${key}.${resolvedProperty}`);
        }
      } else {
        properties.push(key);
      }
    }

    return properties;
  } else if (schema.type === "array") {
    return resolveSchema(schema.items);
  } else {
    return "literal";
  }
};

/**
 * Este método retorna uma lista de todos os campos que podem ser selecionados com base-entity em um TObject do TypeBox
 *
 * Exemtypeplo:
 *   Sendo Cidade(int id, string nome, Estado estado)
 *   Sendo Estado (id, nome)
 *   Sendo a entrada "schema" Cidade
 *   O retorno deve ser: ["id", "nome", "estado.id", "estado.nome"]
 * @param schema
 */
export const getSelectionFromTypeboxSchemaObject = (schema: TObject) => {
  const resolved = resolveSchema(schema);

  if (resolved === "literal") {
    return [];
  }

  return resolved;
};
