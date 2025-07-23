import { INestedNode, NestedNode } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NestedNode";
import { INodeBase, NodeBase } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeBase";
import { BuildCheckType } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/helpers";
import * as valibot from "valibot";

export type INodeTypeArray = INodeBase & {
  type: "array";
  items: INestedNode;
};

export const NodeTypeArray = valibot.intersect([
  NodeBase,

  valibot.object({
    type: valibot.literal("array"),
    items: valibot.lazy(() => NestedNode),
  }),
]);

export const CheckNodeTypeArray = BuildCheckType<any, INodeTypeArray>(NodeTypeArray);
