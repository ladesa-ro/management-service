import type { IGraphQlRepresentation } from "@/application/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Integrations/GraphQl/GraphQlNodeCompiler";
import { type INestedNode, type INodeTypeObjectOperation, ParseNodeTypeObjectEntity } from "@/application/standards/especificacao/infrastructure";
import * as ChangeCase from "change-case";

export class GraphQlOperationInputAdapter {
  BuildCombinedEntityForOperationInput(operation: INodeTypeObjectOperation) {
    const combinedProperties: Record<string, INestedNode> = {};

    const input = operation?.properties?.input;

    const params = input?.properties?.params;

    if (params) {
      for (const [key, node] of Object.entries(params)) {
        const projectedKey = node["x-unispec-gql-key"] ?? ChangeCase.camelCase(key);
        combinedProperties[projectedKey] = node;
      }
    }

    const queries = input?.properties?.queries;

    if (queries) {
      for (const [key, node] of Object.entries(queries)) {
        const projectedKey = node["x-unispec-gql-key"] ?? ChangeCase.camelCase(key);
        combinedProperties[projectedKey] = node;
      }
    }

    const inputBody = input?.properties?.body;

    if (inputBody) {
      combinedProperties.dto = inputBody;
    }

    return ParseNodeTypeObjectEntity({
      type: "object",
      properties: combinedProperties,

      "x-unispec-kind": "entity",
      "x-unispec-entity-id": `${operation["x-unispec-operation-id"]}CombinedInputs`,
    });
  }

  BuildCombinedTypeForOperation(operation: INodeTypeObjectOperation): IGraphQlRepresentation {
    const combinedInputView = this.BuildCombinedEntityForOperationInput(operation);

    // TODO

    // const graphQlRepresentation = BuildGraphQlRepresentation(operationCombinedGraphQlInput, {
    //   mode: "input",
    //   gqlStrategy: "args-type",
    // });

    // return graphQlRepresentation;

    // {
    //   mode: "input",
    //   gqlStrategy: "args-type",
    // }
    return {
      type: void 0,
      nullable: false,
    };
  }

  static DecombineOperationInput(operation: INodeTypeObjectOperation, inputData: any) {
    const operationInput = operation.properties.input;

    if (!operationInput || !inputData) {
      return null;
    }

    const decombined: any = {
      params: {},
      queries: {},
      body: undefined,
    };

    const params = operationInput.properties.params;

    if (params) {
      for (const [key] of Object.entries(params.properties)) {
        const projectedKey = ChangeCase.camelCase(key);

        if (projectedKey in inputData) {
          decombined.params[key] = inputData[key];
        }
      }
    }

    const queries = operationInput.properties.queries;

    if (queries) {
      for (const [key] of Object.entries(queries.properties)) {
        const projectedKey = ChangeCase.camelCase(key);

        if (projectedKey in inputData) {
          decombined.queries[key] = inputData[key];
        }
      }
    }

    const body = operationInput.properties.body;

    if (body) {
      decombined.body = inputData.dto;
    }

    return decombined;
  }
}
