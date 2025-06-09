import { inspect } from "node:util";
import type { ISpecNodesStore } from "@/application/standards/especificacao/business-logic/SpecNodesStore/Types/ISpecNodesStore";
import {
  CheckNodeCore,
  CheckNodeRef,
  CheckNodeTypeNull,
  CheckType,
  type INode,
  type INodeCore,
  type INodeRef,
  type INodeTypeObjectEntity,
  type INodeTypeObjectOperation,
  NodeTypeObjectEntity,
  NodeTypeObjectOperation,
  ParseNodeRef,
  deduplicateSchemaNodes,
} from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas";
import { Not } from "@/infrastructure/fixtures/utils/not";
import { mergeSchemas } from "@fastify/merge-json-schemas";
import defu from "defu";

const strict = false;

export type IComposedResult = {
  node: INodeCore;
  nullable: boolean;
};

export class SpecNodesStoreFromNpmPackage implements ISpecNodesStore {
  #mapNodes = new Map<string, INode>();
  #mapEntities = new Map<string, INodeTypeObjectEntity>();
  #mapOperations = new Map<string, INodeTypeObjectOperation>();

  get Nodes() {
    return this.FetchNodesSync();
  }

  *FetchNodesSync() {
    const especificacao = require("@ladesa-ro/especificacao/nodes");

    for (const node of especificacao.Nodes) {
      yield node;
    }
  }

  GetNodeWithId(name: string): INode {
    if (this.#mapNodes.has(name)) {
      const mappedNode = this.#mapNodes.get(name);
      return mappedNode!;
    }

    for (const node of this.Nodes) {
      if ((!strict || CheckType(NodeTypeObjectEntity, node)) && node["$id"] === name) {
        this.#mapNodes.set(name, node);
        return node;
      }
    }

    throw new Error(`node not found: ${name}`);
  }

  GetEntityNode(name: string) {
    if (this.#mapEntities.has(name)) {
      const mappedNode = this.#mapEntities.get(name);
      return mappedNode!;
    }

    for (const node of this.Nodes) {
      if ((!strict || CheckType(NodeTypeObjectEntity, node)) && node["x-unispec-entity-id"] === name) {
        this.#mapEntities.set(name, node);
        return node;
      }
    }

    throw new Error(`entity not found: ${name}`);
  }

  GetOperationNode(name: string): INodeTypeObjectOperation {
    if (this.#mapOperations.has(name)) {
      const mappedNode = this.#mapOperations.get(name);
      return mappedNode!;
    }

    for (const node of this.Nodes) {
      if ((!strict || CheckType(NodeTypeObjectOperation, node)) && node["x-unispec-operation-id"] === name) {
        this.#mapOperations.set(name, node);
        return node;
      }
    }

    throw new Error(`operation not found: ${name}`);
  }

  //

  GetNestedRefs(initialCursor: string | INodeRef | INodeCore): (INodeCore | INodeRef)[] {
    const composedNodeLayers: (INodeCore | INodeRef)[] = [];

    let cursor = initialCursor;

    do {
      if (CheckNodeCore(cursor)) {
        composedNodeLayers.push(cursor);
        break;
      }

      let references: string | null = null;

      if (CheckNodeRef(cursor)) {
        references = cursor.$ref;
        composedNodeLayers.push(cursor);
      } else if (typeof cursor === "string") {
        references = cursor;
        composedNodeLayers.push(ParseNodeRef({ $ref: cursor }));
      }

      if (references) {
        cursor = this.GetNodeWithId(references);
      } else {
        debugger;
        console.debug({ cursor, references });
        throw new TypeError("Invalid cursor");
      }
    } while (true);

    return composedNodeLayers;
  }

  ComposeNestedRefs(initialCursor: string | INodeRef | INodeCore): INodeCore {
    const layers = this.GetNestedRefs(initialCursor);

    const composedNode = defu<any, any[]>({}, ...layers);

    delete composedNode.$ref;

    if (!CheckNodeCore(composedNode)) {
      throw new TypeError("composed not was not a valid NodeCore.");
    }

    return composedNode;
  }

  ComposeAnyOf(rawAnyOf?: INode[]) {
    if (rawAnyOf) {
      const anyOf = deduplicateSchemaNodes(rawAnyOf);

      if (anyOf && anyOf.length > 0) {
        if (anyOf.length === 1) {
          return {
            node: this.ComposeNestedRefs(anyOf[0]),
            nullable: false,
          };
        }

        if (anyOf.length === 2 && anyOf.some(Not(CheckNodeTypeNull)) && anyOf.some(CheckNodeTypeNull)) {
          const otherNode = anyOf.find(Not(CheckNodeTypeNull));

          if (otherNode) {
            return {
              node: this.ComposeNestedRefs(otherNode),
              nullable: true,
            };
          }
        }

        console.debug(
          inspect(
            { rawAnyOf },
            {
              depth: Number.POSITIVE_INFINITY,
            },
          ),
        );

        throw new TypeError(`${SpecNodesStoreFromNpmPackage.name}#${this.ComposeAnyOf.name}: could not handle anyOf`);
      }
    }

    return {
      node: null,
      nullable: false,
    };
  }

  Compose(initialCursor: string | INodeRef | INodeCore): IComposedResult {
    const schemas: INodeCore[] = [];

    const composedNestedRefsNode = this.ComposeNestedRefs(initialCursor);

    schemas.push({ ...composedNestedRefsNode, anyOf: undefined });

    const anyOf = this.ComposeAnyOf(composedNestedRefsNode.anyOf);

    if (anyOf.node) {
      const decomposed = this.Compose(anyOf.node);

      anyOf.nullable = anyOf.nullable || decomposed.nullable;

      schemas.push({ ...decomposed });
    }

    const node: INodeCore = mergeSchemas(
      [
        {
          ...composedNestedRefsNode,
          anyOf: undefined,
          $ref: undefined,
        },
        anyOf.node,
      ].filter(Boolean),
      {
        onConflict: "first",
      },
    );

    return {
      node,
      nullable: anyOf.nullable,
    };
  }
}
