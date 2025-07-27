import * as valibot from "valibot";
import { INodeCore, NodeCore } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeCore";
import { INodeRef, NodeRef } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeRef";

export type INode = INodeCore | INodeRef;

export const Node = valibot.union([valibot.lazy(() => NodeCore), valibot.lazy(() => NodeRef)]);
