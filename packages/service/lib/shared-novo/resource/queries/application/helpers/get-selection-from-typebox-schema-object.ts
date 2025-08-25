import { TObject, TSchema, TypeGuard } from "@sinclair/typebox";

const resolveSchema = (schema: TSchema): "literal" | string[] => {
  if (TypeGuard.IsRef(schema)) {
    throw new Error("Not implemented");
  } else if (TypeGuard.IsObject(schema)) {
    const properties: string[] = [];

    for (const property of Object.entries(schema.properties)) {
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
  } else if (TypeGuard.IsArray(schema)) {
    return resolveSchema(schema.items);
  } else {
    return "literal";
  }
};

/**
 * Este método retorna uma lista de todos os campos que podem ser selecionados com base em um TObject do TypeBox
 *
 * Exemplo:
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
