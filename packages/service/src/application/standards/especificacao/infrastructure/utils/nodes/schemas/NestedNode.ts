import { INode, Node } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/Node";
import * as valibot from "valibot";

export type INestedNode = INode;

export const NestedNode = valibot.lazy(() => Node);
