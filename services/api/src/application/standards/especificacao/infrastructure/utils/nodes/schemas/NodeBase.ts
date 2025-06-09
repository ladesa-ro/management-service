import { INestedNode, NestedNode } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NestedNode";
import type { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import * as valibot from "valibot";

const $schema = "https://json-schema.org/draft/2020-12/schema";

export type INodeBase = SchemaObject & {
  $schema?: typeof $schema;
  $id?: string;

  type?: string;
  description?: string;
  required?: boolean;

  anyOf?: INestedNode[];

  $ref?: never | undefined;
};

export const NodeBase = valibot.object({
  $schema: valibot.optional(valibot.literal($schema)),
  $id: valibot.optional(valibot.string()),

  type: valibot.optional(valibot.string()),
  description: valibot.optional(valibot.string()),

  anyOf: valibot.optional(valibot.array(valibot.lazy(() => NestedNode))),

  $ref: valibot.optional(valibot.union([valibot.never("$ref is not allowed"), valibot.undefined()])),
});
