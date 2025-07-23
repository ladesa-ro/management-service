import { INodeTypeArray, NodeTypeArray } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeArray";
import { INodeTypeBoolean, NodeTypeBoolean } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeBoolean";
import { INodeTypeNull, NodeTypeNull } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeNull";
import { INodeTypeObject, NodeTypeObject } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeObject";
import { INodeTypeString, NodeTypeString } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeString";
import * as valibot from "valibot";

export type INodeType = INodeTypeArray | INodeTypeBoolean | INodeTypeString | INodeTypeNull | INodeTypeObject;

export const NodeType = valibot.union([
  //
  NodeTypeArray,
  NodeTypeBoolean,
  NodeTypeString,
  NodeTypeNull,
  NodeTypeObject,
]);
