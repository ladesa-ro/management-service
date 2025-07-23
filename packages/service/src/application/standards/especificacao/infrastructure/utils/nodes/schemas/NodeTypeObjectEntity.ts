import { INodeTypeObjectBase, NodeTypeObjectBase } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeObjectBase";
import { BuildCheckType, BuildParseType } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/helpers";
import * as valibot from "valibot";

export type INodeTypeObjectEntity = INodeTypeObjectBase & {
  "x-unispec-kind": "entity";
  "x-unispec-entity-id": string;
  "x-unispec-entity-partial-of"?: string;
};

export const NodeTypeObjectEntity = valibot.strictObject({
  ...NodeTypeObjectBase.entries,
  ["x-unispec-kind"]: valibot.literal("entity"),
  ["x-unispec-entity-id"]: valibot.string(),
  ["x-unispec-entity-partial-of"]: valibot.optional(valibot.string()),
});

export const CheckNodeTypeObjectEntity = BuildCheckType<any, INodeTypeObjectEntity>(NodeTypeObjectEntity);
export const ParseNodeTypeObjectEntity = BuildParseType(NodeTypeObjectEntity);
