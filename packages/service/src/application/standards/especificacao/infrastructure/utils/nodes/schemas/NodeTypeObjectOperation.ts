import { INestedNode, NestedNode } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NestedNode";
import { INodeTypeObjectBase, NodeTypeObjectBase } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeObjectBase";
import { BuildCheckType, BuildParseType } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas/helpers";
import * as valibot from "valibot";

export type INodeTypeObjectOperation = INodeTypeObjectBase & {
  ["x-unispec-kind"]: "operation";
  ["x-unispec-operation-id"]: string;

  properties: {
    input: INodeTypeObjectBase & {
      properties: {
        body?: INestedNode;

        queries?: INodeTypeObjectBase & {
          properties: Record<
            string,
            {
              "x-unispec-gql-key"?: string;
            } & INestedNode
          >;
        };

        params?: INodeTypeObjectBase & {
          properties: Record<
            string,
            {
              "x-unispec-gql-key"?: string;
            } & INestedNode
          >;
        };
      };
    };

    output: INodeTypeObjectBase & {
      properties: {
        success: INestedNode;
      };
    };
  };

  "x-unispec-operation-meta"?: {
    gql?: {
      kind?: "query" | "mutation";
    };
  };
};

export const NodeTypeObjectOperation = valibot.strictObject({
  ...NodeTypeObjectBase.entries,

  ["x-unispec-kind"]: valibot.literal("operation"),
  ["x-unispec-operation-id"]: valibot.string(),

  ["x-unispec-operation-meta"]: valibot.optional(
    valibot.object({
      gql: valibot.optional(
        valibot.object({
          kind: valibot.optional(valibot.union([valibot.literal("query"), valibot.literal("mutation")])),
        }),
      ),
    }),
  ),

  properties: valibot.object({
    input: valibot.optional(
      valibot.object({
        ...NodeTypeObjectBase.entries,

        properties: valibot.optional(
          valibot.object({
            body: valibot.optional(valibot.lazy(() => NestedNode)),

            queries: valibot.optional(
              valibot.object({
                ...NodeTypeObjectBase.entries,

                properties: valibot.record(
                  valibot.string(),
                  valibot.union([
                    valibot.lazy(() => NestedNode),
                    valibot.object({
                      ["x-unispec-gql-key"]: valibot.optional(valibot.string()),
                    }),
                  ]),
                ),
              }),
            ),

            params: valibot.optional(
              valibot.object({
                ...NodeTypeObjectBase.entries,

                properties: valibot.record(
                  valibot.string(),
                  valibot.union([
                    valibot.lazy(() => NestedNode),
                    valibot.object({
                      ["x-unispec-gql-key"]: valibot.optional(valibot.string()),
                    }),
                  ]),
                ),
              }),
            ),
          }),
        ),
      }),
    ),

    output: valibot.optional(
      valibot.object({
        ...NodeTypeObjectBase.entries,

        properties: valibot.optional(
          valibot.object({
            success: valibot.optional(valibot.lazy(() => NestedNode)),
          }),
        ),
      }),
    ),
  }),
});

export const CheckNodeTypeObjectOperation = BuildCheckType<any, INodeTypeObjectOperation>(NodeTypeObjectOperation);
export const ParseNodeTypeObjectOperation = BuildParseType(NodeTypeObjectOperation);
