import SwaggerParser from "@apidevtools/swagger-parser";
import SchemaBuilder from "@pothos/core";
import { camelCase } from "change-case";
import { printSchema } from "graphql";
import { type OpenAPIV3 } from "openapi-types";
import { AppApiDoc } from "@/application/contracts/openapi/document/app-openapi-document";

async function generateSchema(doc: OpenAPIV3.Document) {
  const builder = new SchemaBuilder({});

  const docDereferenced = await SwaggerParser.bundle(doc);

  const getOperationsFromDocument = function* () {
    for (const path of Object.values(docDereferenced.paths)) {
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
  };

  const getGraphqlQueryOrMutationsFromDocument = function* () {
    for (const { method, operationId, jsonResponse, parameters, description } of getOperationsFromDocument()) {
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
  };

  builder.queryType({});
  builder.mutationType({});
  builder.scalarType("JSON", { serialize: (v) => v });

  const _inputObjects = {
    refs: new Map(),
  };

  const _outputObjects = {
    refs: new Map(),
  };

  const claimReference = (mode: "input" | "output", schema: OpenAPIV3.SchemaObject) => {
    console.log(mode, schema);
    return {
      type: "JSON",
      nullable: false,
    };
  };

  const mapJsonType = (
    mode: "input" | "output",
    schema: OpenAPIV3.SchemaObject,
  ): {
    type: string;
    nullable: boolean;
  } => {
    if ("$ref" in schema) {
      return claimReference(mode, schema);
    }

    const { type, nullable } = schema;
    const isNullable = nullable ?? false;

    switch (type) {
      case "string": {
        return {
          type: "String",
          nullable: isNullable,
        };
      }
      case "integer": {
        return {
          type: "Int",
          nullable: isNullable,
        };
      }

      case "number": {
        return {
          type: "Float",
          nullable: isNullable,
        };
      }
      case "boolean": {
        return {
          type: "Boolean",
          nullable: isNullable,
        };
      }

      case "array": {
        if (schema?.items && !Array.isArray(schema.items)) {
          const inner = mapJsonType(mode, schema.items as OpenAPIV3.SchemaObject);

          return {
            type: `[${inner.type}]`,
            nullable: isNullable,
          };
        }

        return {
          type: "[JSON]",
          nullable: isNullable,
        };
      }

      case "object":
      default: {
        return {
          type: "JSON",
          nullable: isNullable,
        };
      }
    }
  };

  const buildArgs = (t: any, queryOrMutation: any) => {
    const args = new Map();

    for (const [argName, arg] of queryOrMutation.args) {
      console.log(argName, arg.schema, mapJsonType("input", arg.schema));
      args.set(
        argName,
        t.arg({
          ...mapJsonType("input", arg.schema),
          required: arg.required,
          description: arg.description,
        }),
      );
    }

    return Object.fromEntries(args);
  };

  for (const queryOrMutation of getGraphqlQueryOrMutationsFromDocument()) {
    switch (queryOrMutation.mode) {
      case "query": {
        builder.queryField(queryOrMutation.name, (t) => {
          return t.field({
            ...mapJsonType("output", queryOrMutation.jsonResponse),
            args: buildArgs(t, queryOrMutation),
            description: queryOrMutation.description,
          });
        });

        break;
      }

      case "mutation": {
        builder.mutationField(queryOrMutation.name, (t) => {
          return t.field({
            ...mapJsonType("output", queryOrMutation.jsonResponse),
            args: buildArgs(t, queryOrMutation),
            description: queryOrMutation.description,
          });
        });

        break;
      }
    }
  }

  for (const _outputObjectsToRegisterElement of Object.entries({})) {
    const _GiraffeInput = builder.inputType("GiraffeInput", {
      fields: (t) => ({
        name: t.string({ required: true }),
        birthdate: t.string({ required: true }),
        height: t.float({ required: true }),
      }),
    });
  }

  return printSchema(builder.toSchema());
}

const gql = await generateSchema(AppApiDoc);
console.log(gql);
