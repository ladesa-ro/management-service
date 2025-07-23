import { GenericClassCompilerFromUnispecEntity } from "@/application/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Core/GenericClassCompilerFromUnispecEntity";
import { GraphQlClassCompilerFromUnispecEntityHandler } from "@/application/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Integrations/GraphQl/GraphQlClassCompilerFromUnispecEntityHandler";
import { GraphQlNodeCompiler } from "@/application/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Integrations/GraphQl/GraphQlNodeCompiler";
import { SwaggerClassCompilerFromUnispecEntityHandler } from "@/application/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Integrations/Swagger/SwaggerClassCompilerFromUnispecEntityHandler";
import { SwaggerNodeCompiler } from "@/application/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Integrations/Swagger/SwaggerNodeCompiler";
import { IDtoCompilerContext } from "@/application/standards/especificacao/business-logic/DtoCompiler/typings";
import { getSpecNodesStore } from "@/application/standards/especificacao/business-logic/SpecNodesStore";
import { CheckNodeTypeObjectEntity, INode, NodeTypeObjectEntity } from "@/application/standards/especificacao/infrastructure";
import * as valibot from "valibot";

const CursorContractNode = valibot.union([
  NodeTypeObjectEntity,

  valibot.object({
    $ref: valibot.optional(valibot.string()),
    anyOf: valibot.optional(valibot.union([valibot.tuple([]), valibot.never()])),
  }),
]);

const CursorContract = valibot.union([valibot.string(), CursorContractNode]);

export interface IDtoCompiler extends GenericClassCompilerFromUnispecEntity {
  graphQlNodeCompiler: GraphQlNodeCompiler;
  swaggerNodeCompiler: SwaggerNodeCompiler;

  GetContext(mode: IDtoCompilerContext["mode"]): IDtoCompilerContext;
  CompileClass(node: INode, classesMap?: Map<string, any>): any;
  CompileNode(cursor: string | INode, classesMap?: Map<string, any>): any;
}

export class DtoCompiler extends GenericClassCompilerFromUnispecEntity implements IDtoCompiler {
  #store = getSpecNodesStore();

  #classesMap = new Map<string, any>();

  graphQlClassCompiler = new GraphQlClassCompilerFromUnispecEntityHandler();
  swaggerClassCompiler = new SwaggerClassCompilerFromUnispecEntityHandler();

  get graphQlNodeCompiler() {
    return this.graphQlClassCompiler.graphQlNodeCompiler;
  }

  get swaggerNodeCompiler() {
    return this.swaggerClassCompiler.swaggerNodeCompiler;
  }

  constructor() {
    super();

    this.AddHandler(this.swaggerClassCompiler);
    this.AddHandler(this.graphQlClassCompiler);
  }

  GetContext(mode: IDtoCompilerContext["mode"]): IDtoCompilerContext {
    return {
      mode,
      dtoCompiler: this,
      nodesStore: this.#store,
    };
  }

  CompileNode(cursor: string | INode, classesMap: Map<string, any> = this.#classesMap) {
    const { node } = this.#store.Compose(cursor);

    return this.CompileClass(node, classesMap);
  }

  CompileClass(node: INode, classesMap: Map<string, any> = this.#classesMap) {
    if (!CheckNodeTypeObjectEntity(node)) {
      const output = valibot.safeParse(NodeTypeObjectEntity, node);
      console.debug(output.issues);
      console.debug(node);
      debugger;

      throw new Error("You must provide a NodeTypeObjectEntity to DtoCompiler#CompileClass");
    }

    return super.CompileClass(node, classesMap);
  }
}

export const dtoCompiler = new DtoCompiler();
