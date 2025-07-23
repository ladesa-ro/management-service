import {
  CheckNodeRef,
  CheckNodeTypeArray,
  CheckNodeTypeObject,
  CheckNodeTypeObjectEntity,
  CheckNodeTypeObjectOperation,
  CheckNodeTypeString,
  CheckType,
  INode,
  INodeRef,
  INodeTypeArray,
  INodeTypeBoolean,
  INodeTypeNull,
  INodeTypeObject,
  INodeTypeObjectBase,
  INodeTypeObjectEntity,
  INodeTypeObjectOperation,
  INodeTypeString,
  NodeTypeBoolean,
  NodeTypeNull,
  NodeTypeObjectBase,
} from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas";

export class NodeHandler<Out = unknown, Context = void> {
  HandleDefault(node: any, context: Context): Out {
    console.debug("unhandled node:", node);
    throw new Error("unhandled node");
  }

  HandleTypeObjectBase(node: INodeTypeObjectBase, context: Context): Out {
    return this.HandleDefault(node, context);
  }

  HandleTypeObjectEntity(node: INodeTypeObjectEntity, context: Context): Out {
    return this.HandleDefault(node, context);
  }

  HandleTypeObjectOperation(node: INodeTypeObjectOperation, context: Context): Out {
    return this.HandleDefault(node, context);
  }

  HandleTypeObject(node: INodeTypeObject, context: Context): Out {
    if (CheckNodeTypeObjectOperation(node)) {
      return this.HandleTypeObjectOperation(node, context);
    }

    if (CheckNodeTypeObjectEntity(node)) {
      return this.HandleTypeObjectEntity(node, context);
    }

    if (CheckType(NodeTypeObjectBase, node)) {
      return this.HandleTypeObjectBase(node, context);
    }

    return this.HandleDefault(node, context);
  }

  HandleTypeNull(node: INodeTypeNull, context: Context): Out {
    return this.HandleDefault(node, context);
  }

  HandleTypeArray(node: INodeTypeArray, context: Context): Out {
    return this.HandleDefault(node, context);
  }

  HandleTypeBoolean(node: INodeTypeBoolean, context: Context): Out {
    return this.HandleDefault(node, context);
  }

  HandleTypeString(node: INodeTypeString, context: Context): Out {
    return this.HandleDefault(node, context);
  }

  HandleRef(node: INodeRef, context: Context): Out {
    return this.HandleDefault(node, context);
  }

  Handle(node: INode, context: Context): Out {
    if (CheckNodeRef(node)) {
      return this.HandleRef(node, context);
    }

    if (CheckType(NodeTypeNull, node)) {
      return this.HandleTypeNull(node, context);
    }

    if (CheckType(NodeTypeBoolean, node)) {
      return this.HandleTypeBoolean(node, context);
    }

    if (CheckNodeTypeArray(node)) {
      return this.HandleTypeArray(node, context);
    }

    if (CheckNodeTypeString(node)) {
      return this.HandleTypeString(node, context);
    }

    if (CheckNodeTypeObject(node)) {
      return this.HandleTypeObject(node, context);
    }

    return this.HandleDefault(node, context);
  }
}
