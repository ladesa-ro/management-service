import SwaggerParser from "@apidevtools/swagger-parser";
import SchemaBuilder from "@pothos/core";
import { merge, openApiMergeRules } from "allof-merge";
import { camelCase } from "change-case";
import type { OpenAPIV3 } from "openapi-types";

type IOperationMetadata = {
  method: string;
  operationId: string;
  description: string;
  jsonResponse: OpenAPIV3.SchemaObject;
  parameters: OpenAPIV3.ParameterObject[];
};

type IQueryOrMutationMetadata = {
  name: string;
  mode: "query" | "mutation";

  description: string;

  jsonResponse: OpenAPIV3.SchemaObject;
  parameters: OpenAPIV3.ParameterObject[];
};

// type IMappedType = {};

export class OpenApiToGraphQLSchema {
  public async handleDocument(originalDoc: OpenAPIV3.Document) {
    const parser = new SwaggerParser();

    const docBundled = await parser.bundle(originalDoc, {
      dereference: { circular: false },
    });

    const docBundledCombined = merge(docBundled, {
      mergeRefSibling: false,
      mergeCombinarySibling: false,
      onMergeError: (msg) => {
        throw new Error(msg);
      },
      rules: openApiMergeRules("3.1.x"),
    });

    return docBundledCombined;
  }

  public *extractOperationsMetadataFromDocument(doc: OpenAPIV3.Document): Iterable<IOperationMetadata> {
    if (!doc || !doc.paths) return;

    for (const path of Object.values(doc.paths)) {
      for (const [method, operation] of Object.entries(path)) {
        const { operationId, parameters, description } = operation;

        const jsonResponse = operation.responses?.["200"]?.content?.["application/json"]?.["schema"];

        if (!jsonResponse) continue;

        yield {
          method,
          description,
          operationId,
          jsonResponse,
          parameters,
        };
      }
    }
  }

  public *extractQueriesAndMutationsMetadata(doc: OpenAPIV3.Document): Iterable<IQueryOrMutationMetadata> {
    for (const { method, operationId, jsonResponse, parameters, description } of this.extractOperationsMetadataFromDocument(doc)) {
      const mode = method.toLowerCase() === "get" ? "query" : "mutation";

      const name = camelCase(operationId);

      const args = new Map();

      for (const parameter of parameters) {
        const castName = camelCase(parameter.name);

        args.set(castName, {
          originalName: parameter.name,

          required: parameter.required,
          description: parameter.description,
          schema: parameter.schema,
        });
      }

      yield {
        mode,
        name,
        description,
        args,
        jsonResponse,
      };
    }
  }

  public *extractTypesFromDocument(doc: OpenAPIV3.Document) {
    if (!doc || !doc.components) return;

    type IExtractedTypeMetadata = {
      name: string;
      mode: "input" | "output";
      schema: OpenAPIV3.SchemaObject;
    };

    const _extractedSchemas = new Map<string, IExtractedTypeMetadata>();

    for (const [_schemaName, _schemaDefinition] of Object.entries(doc?.components?.schemas ?? {})) {
      // TODO: implementar lógica correta e incluir em extractedTypes
      yield* [];
    }
  }

  getNameForNode(mode: "input" | "output", node: OpenAPIV3.SchemaObject) {
    if (mode === "input") {
    }
  }

  public async buildSchemaForDocument(originalDocument: OpenAPIV3.Document) {
    const builder = new SchemaBuilder({});

    builder.queryType({});
    builder.mutationType({});
    builder.scalarType("JSON", { serialize: (v) => v });

    const handledDocument = await this.handleDocument(originalDocument);

    const _prccessedQueue = new Map();

    const buildFieldTypeForSchema = (options: {
      mode: "input" | "output";
      schema: OpenAPIV3.SchemaObject;
    }): {
      type: string | [string];
      description: string;
    } => {
      // TODO: if present in ProcessedQueue, return from there

      /**
       * maybe be necessary to have the information about the context of the object like
       *
       * 1 - its a inline schema from the route response?
       * 2 - its a ref for components?
       * 3 - its a schema for input request body or parameters?
       */

      // TODO: add the target schema at the first, but if some dependency is found that was not processed yet, then add it to start of the queue;
      const _processQueue = new Set();
    };

    for (const queryOrMutation of this.extractQueriesAndMutationsMetadata(handledDocument)) {
      const { name, mode, description, jsonSchema } = queryOrMutation;

      switch (mode) {
        case "query": {
          builder.queryField(name, (t) => {
            return t.field({
              ...buildFieldTypeForSchema({ mode: "output", schema: jsonSchema, fallbackName: `${name}Output` }),

              //args: buildArgs(t, queryOrMutation),
              description: description,
            });
          });

          break;
        }

        case "mutation": {
          builder.mutationField(name, (t) => {
            return t.field({
              ...buildFieldTypeForSchema({ mode: "output", schema: jsonSchema, fallbackName: `${name}Output` }),

              // args: buildArgs(t, queryOrMutation),
              description: description,
            });
          });

          break;
        }
      }
    }

    return builder.toSchema();
  }
}
