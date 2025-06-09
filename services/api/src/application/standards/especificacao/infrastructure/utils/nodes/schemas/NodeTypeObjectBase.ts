import { INestedNode, NestedNode } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NestedNode";
import { INodeBase, NodeBase } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeBase";
import * as valibot from "valibot";

export type INodeTypeObjectBase = INodeBase & {
  ["x-unispec-kind"]: never;

  type: "object";
  properties: Record<string, INestedNode>;

  required?: string[] | boolean;
  additionalProperties?: boolean;
};

export const NodeTypeObjectBase = valibot.object({
  ...NodeBase.entries,

  ["x-unispec-kind"]: valibot.never(),

  type: valibot.literal("object"),

  properties: valibot.record(
    valibot.string(),
    valibot.lazy(() => NestedNode),
  ),

  required: valibot.optional(valibot.union([valibot.boolean(), valibot.array(valibot.string())])),

  additionalProperties: valibot.optional(valibot.boolean()),
});
