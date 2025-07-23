import { IDtoCompilerContext } from "@/application/standards/especificacao/business-logic/DtoCompiler/typings";
import { INode, NodeHandler } from "@/application/standards/especificacao/infrastructure";
import { GqlTypeReference } from "@nestjs/graphql";

export type IGraphQlRepresentation = {
  type?: void | (() => GqlTypeReference);
  nullable: boolean;
};

export class GraphQlNodeCompiler extends NodeHandler<IGraphQlRepresentation, IDtoCompilerContext> {
  Handle(node: INode, context: IDtoCompilerContext): IGraphQlRepresentation {
    const handled = super.Handle(node, context);

    if (handled) {
      return handled;
    }

    throw new TypeError("could not handle node");
  }
}
