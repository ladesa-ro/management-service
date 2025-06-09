import { BuildCheckType, BuildParseType } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/helpers";
import * as valibot from "valibot";

export type INodeRef = {
  $ref: string;
};

export const NodeRef = valibot.object({
  $ref: valibot.string(),
});

export const CheckNodeRef = BuildCheckType<any, INodeRef>(NodeRef);
export const ParseNodeRef = BuildParseType<any, INodeRef>(NodeRef);
