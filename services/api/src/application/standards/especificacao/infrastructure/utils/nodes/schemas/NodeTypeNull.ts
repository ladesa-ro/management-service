import { INodeBase, NodeBase } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeBase";
import { BuildCheckType } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/helpers";
import * as valibot from "valibot";

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
