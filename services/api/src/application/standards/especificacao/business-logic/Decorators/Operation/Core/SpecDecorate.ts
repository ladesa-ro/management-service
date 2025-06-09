import { COMBINED_INPUT_PARAM, type ICombinedInputParamMetadata } from "@/application/standards/especificacao/business-logic/CombinedInput";
import { GraphQlOperationInputAdapter } from "@/application/standards/especificacao/business-logic/Decorators/Operation/Adapters";
import type { ISpecDecorateHandler, ISpecDecorateOperationContext } from "@/application/standards/especificacao/business-logic/Decorators/Operation/Core/ISpecDecorateHandler";
import { OPERATION_KEY } from "@/application/standards/especificacao/business-logic/Decorators/Tokens";
import { dtoCompiler } from "@/application/standards/especificacao/business-logic/DtoCompiler";
import type { ISpecNodesStore } from "@/application/standards/especificacao/business-logic/SpecNodesStore";
import { ValidationPipeAjv } from "@/application/standards/especificacao/business-logic/Validation/ValidationPipeAjv";
import { SetMetadata, applyDecorators, createParamDecorator } from "@nestjs/common";
import type { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

export interface ISpecDecorate {
  store: ISpecNodesStore;

  AddHandler(handler: ISpecDecorateHandler): this;
  DecorateOperation(token: string): MethodDecorator;
}

export class SpecDecorate implements ISpecDecorate {
  #handlers = new Set<ISpecDecorateHandler>();

  constructor(public store: ISpecNodesStore) {}

  AddHandler(handler: ISpecDecorateHandler) {
    this.#handlers.add(handler);
    return this;
  }

  DecorateOperation(token: string): MethodDecorator {
    const store = this.store;

    const operationNode = store.GetOperationNode(token);

    const context: ISpecDecorateOperationContext = {
      operationNode,
      dtoCompiler: dtoCompiler,

      methodDecorators: [],
      AddMethodDecorator(decorator) {
        this.methodDecorators.push(decorator);
        return this;
      },

      combinedInputDecorators: [],
      AddCombinedInputDecorator(decorator) {
        this.combinedInputDecorators.push(decorator);
        return this;
      },

      meta: {
        node: operationNode,
        description: operationNode.description ?? "Sem descrição.",
        operationId: operationNode["x-unispec-operation-id"],
      },
    };

    for (const handler of this.#handlers) {
      handler.HandleOperation(context);
    }

    context.methodDecorators.push(SetMetadata(OPERATION_KEY, context.meta));

    //
    context.AddMethodDecorator((target, propertyKey, descriptor) => {
      if (descriptor.value) {
        const combinedInputParam: ICombinedInputParamMetadata = Reflect.getMetadata(COMBINED_INPUT_PARAM, descriptor.value);

        if (combinedInputParam) {
          const { parameterIndex } = combinedInputParam;

          const validationPipe = new ValidationPipeAjv(operationNode.properties.input);

          context.AddCombinedInputDecorator(
            createParamDecorator((_, executionContext: ExecutionContextHost) => {
              const executionContextType = executionContext.getType<string>();

              switch (executionContextType) {
                case "graphql": {
                  const [, input] = executionContext.getArgs();

                  return GraphQlOperationInputAdapter.DecombineOperationInput(operationNode, input);
                }

                case "http": {
                  const httpContext = executionContext.switchToHttp();

                  const request = httpContext.getRequest();

                  const body = request.body;
                  const params = request.params;
                  const queries = request.query;

                  return {
                    body,
                    params,
                    queries,
                  };
                }

                default: {
                  break;
                }
              }
            })(null, validationPipe),
          );

          for (const paramDecorator of context.combinedInputDecorators) {
            paramDecorator(target, propertyKey, parameterIndex);
          }
        }
      }
    });
    //

    return applyDecorators(...context.methodDecorators);
  }
}
