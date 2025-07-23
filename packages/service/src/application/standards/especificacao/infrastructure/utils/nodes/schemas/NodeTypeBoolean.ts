import { INodeBase, NodeBase } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeBase";
import { BuildCheckType } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/helpers";
import * as valibot from "valibot";

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
