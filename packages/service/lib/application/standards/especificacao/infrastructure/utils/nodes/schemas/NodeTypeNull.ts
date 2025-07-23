import * as valibot from "valibot";
import { BuildCheckType } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/helpers";
import { INodeBase, NodeBase } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeBase";

export type INodeTypeNull = INodeBase & {
  type: "null";
};

export const NodeTypeNull: valibot.GenericSchema<INodeTypeNull> = valibot.intersect([
  NodeBase,
  valibot.object({
    type: valibot.literal("null"),
  }),
]);

export const CheckNodeTypeNull = BuildCheckType(NodeTypeNull);
