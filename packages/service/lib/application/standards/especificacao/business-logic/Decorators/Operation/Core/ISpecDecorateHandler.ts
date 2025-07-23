import { IDtoCompiler } from "@/application/standards/especificacao/business-logic/DtoCompiler";
import { INodeTypeObjectOperation } from "@/application/standards/especificacao/infrastructure";

export interface ISpecDecorateOperationContext {
  readonly operationNode: INodeTypeObjectOperation;
  readonly dtoCompiler: IDtoCompiler;

  methodDecorators: MethodDecorator[];
  combinedInputDecorators: ParameterDecorator[];
  meta: {
    node: INodeTypeObjectOperation;
    operationId: string;
    description: string;
  };

  AddMethodDecorator(decorator: MethodDecorator): this;

  AddCombinedInputDecorator(decorator: ParameterDecorator): this;
}

export interface ISpecDecorateHandler {
  HandleOperation(context: ISpecDecorateOperationContext): void;
}
