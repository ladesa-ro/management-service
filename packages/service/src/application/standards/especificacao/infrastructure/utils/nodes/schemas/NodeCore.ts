import { INodeBase, NodeBase } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeBase";
import { INodeType, NodeType } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeType";
import { BuildCheckType } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/helpers";
import * as valibot from "valibot";

export type INodeCore = INodeType | INodeBase;

export const NodeCore = valibot.union([
  //
  valibot.lazy(() => NodeType),
  valibot.lazy(() => NodeBase),
]);

export const CheckNodeCore = BuildCheckType<any, INodeCore>(NodeCore);
