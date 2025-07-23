import * as valibot from "valibot";
import { BuildCheckType } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/helpers";
import { INodeBase, NodeBase } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeBase";

export type INodeTypeBoolean = INodeBase & {
  type: "boolean";
};

export const NodeTypeBoolean: valibot.GenericSchema<INodeTypeBoolean> = valibot.intersect([
  NodeBase,
  valibot.object({
    type: valibot.literal("boolean"),
  }),
]);

export const CheckNodeTypeBoolean = BuildCheckType(NodeTypeBoolean);
