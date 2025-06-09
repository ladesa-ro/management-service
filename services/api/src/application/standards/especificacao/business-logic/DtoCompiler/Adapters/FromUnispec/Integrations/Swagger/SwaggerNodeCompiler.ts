import type { IDtoCompilerContext } from "@/application/standards/especificacao/business-logic/DtoCompiler/typings";
import { type INode, type INodeRef, type INodeTypeArray, type INodeTypeObjectEntity, NodeHandler } from "@/application/standards/especificacao/infrastructure";
import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export type ISwaggerResultType = {
  metadata: {
    nullable?: boolean;
    mimeTypes?: string[];
    description?: string;
  };

  representation:
    | {
        kind: "type";
        type: Function;
        isArray?: boolean;
      }
    | {
        kind: "schema";
        schema: SchemaObject & Record<string, any>;
      };
};

export class SwaggerNodeCompiler extends NodeHandler<ISwaggerResultType, IDtoCompilerContext> {
  ComposeNode(node: INode, context: IDtoCompilerContext) {
    const composedResult = context.nodesStore.Compose(node);
    return composedResult;
  }

  HandleTypeObjectEntity(node: INodeTypeObjectEntity, context: IDtoCompilerContext) {
    const composed = this.ComposeNode(node, context);

    const dto = context.dtoCompiler.CompileNode(node);

    return {
      representation: {
        kind: "type",
        type: dto,
      },

      metadata: {
        nullable: composed.nullable,
        description: composed.node?.description,
      },
    } satisfies ISwaggerResultType;
  }

  HandleTypeArray(node: INodeTypeArray, context: IDtoCompilerContext): ISwaggerResultType {
    const itemsRepresentation = this.Handle(node.items, context);

    if (itemsRepresentation.representation.kind === "type") {
      return {
        ...itemsRepresentation,
        representation: {
          ...itemsRepresentation.representation,
          isArray: true,
        },
      };
    }

    const composed = this.ComposeNode(node, context);

    return {
      ...itemsRepresentation,

      metadata: {
        nullable: composed.nullable,
        description: composed.node.description,
      },

      representation: {
        ...itemsRepresentation.representation,

        schema: {
          type: "array",
          nullable: composed.nullable,
          items: {
            ...itemsRepresentation.metadata,
            ...itemsRepresentation.representation.schema,
          },
        },
      },
    };
  }

  HandleRef(node: INodeRef, context: IDtoCompilerContext): ISwaggerResultType {
    const composed = context.nodesStore.ComposeNestedRefs(node);
    return this.Handle(composed, context);
  }

  HandleDefault(node: Exclude<INode, INodeTypeObjectEntity | INodeTypeArray | INodeRef>, context: IDtoCompilerContext): ISwaggerResultType {
    const composed = this.ComposeNode(node, context);

    if (node.anyOf || node.$ref) {
      const representation = this.Handle(composed.node, context);

      return {
        ...representation,
        metadata: {
          ...representation.metadata,
          nullable: representation.metadata.nullable || composed.nullable,
        },
      };
    }

    return {
      metadata: {
        nullable: composed.nullable,
        description: composed.node.description,
      },
      representation: {
        kind: "schema",
        schema: {
          ...composed.node,
        },
      },
    };
  }

  Handle(node: INode, context: IDtoCompilerContext): ISwaggerResultType {
    const handled = super.Handle(node, context);

    if (handled) {
      return handled;
    }

    throw new TypeError("could not handle node");
  }
}
