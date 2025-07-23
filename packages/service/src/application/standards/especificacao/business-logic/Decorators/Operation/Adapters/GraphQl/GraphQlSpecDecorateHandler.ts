import { GraphQlOperationInputAdapter } from "@/application/standards/especificacao/business-logic/Decorators/Operation/Adapters/GraphQl/GraphQlOperationInputAdapter";
import { ISpecDecorateHandler, ISpecDecorateOperationContext } from "@/application/standards/especificacao/business-logic/Decorators/Operation/Core/ISpecDecorateHandler";
import { CheckNodeTypeString } from "@/application/standards/especificacao/infrastructure";
import { Args as GqlArgs, Mutation as GqlMutation, Query as GqlQuery } from "@nestjs/graphql";

export class GraphQlSpecDecorateHandler implements ISpecDecorateHandler {
  operationInputAdapter = new GraphQlOperationInputAdapter();

  constructor() {}

  HandleOperation(context: ISpecDecorateOperationContext): void {
    this.HandleMetadata(context);
    this.HandleInputs(context);
  }

  private HandleMetadata(context: ISpecDecorateOperationContext) {
    const node = context.meta.node;

    const output = node.properties.output;

    const getOperationNodeOutputMetadata = function () {
      if (output) {
        const success = output.properties?.success;

        if (success) {
          const required = output.required?.includes("success");
          return { status: 200, outputs: success, required };
        }
      }

      return null;
    };

    const operationNodeOutputMetadata = getOperationNodeOutputMetadata();

    if (!operationNodeOutputMetadata) return;

    const outputs = operationNodeOutputMetadata.outputs;

    if (CheckNodeTypeString(outputs) && outputs.format === "binary") {
      return null;
    }

    const { dtoCompiler } = context;

    const dtoCompilerContext = dtoCompiler.GetContext("output");

    const graphQlRepresentation = context.dtoCompiler.graphQlNodeCompiler.Handle(outputs, dtoCompilerContext);

    const typeFactory = graphQlRepresentation.type;

    if (!typeFactory) {
      return;
    }

    const kind = node["x-unispec-operation-meta"]?.gql?.kind;

    switch (kind) {
      case "query": {
        context.AddMethodDecorator(
          GqlQuery(typeFactory, {
            name: context.meta.operationId,
            description: context.meta.description,
            nullable: graphQlRepresentation.nullable,
          }),
        );

        break;
      }

      case "mutation": {
        context.AddMethodDecorator(
          GqlMutation(typeFactory, {
            name: context.meta.operationId,
            description: context.meta.description,
            nullable: graphQlRepresentation.nullable,
          }),
        );

        break;
      }

      default: {
        break;
      }
    }
  }

  private HandleInputs(context: ISpecDecorateOperationContext): void {
    const graphQlRepresentation = this.operationInputAdapter.BuildCombinedTypeForOperation(context.operationNode);

    const typeFn = graphQlRepresentation?.type;

    if (typeFn) {
      context.AddCombinedInputDecorator(
        GqlArgs({
          type: typeFn,
        }),
      );
    }
  }
}
