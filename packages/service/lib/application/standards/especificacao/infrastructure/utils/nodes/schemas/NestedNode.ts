import * as valibot from "valibot";
import { INode, Node } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/Node";

export type INestedNode = INode;

export const NestedNode = valibot.lazy(() => Node);
