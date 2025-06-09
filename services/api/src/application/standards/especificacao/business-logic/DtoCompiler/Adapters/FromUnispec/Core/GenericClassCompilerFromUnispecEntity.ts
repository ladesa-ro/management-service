import { ClassCompiler, ClassCompilerHandler, IClassCompilerTypings, ICompileClassContext, INodeProperty } from "@/application/standards/especificacao/infrastructure/utils/class-compiler";
import { INode, INodeTypeObjectEntity } from "@/application/standards/especificacao/infrastructure/utils/nodes/schemas";

export type IGenericClassCompilerFromUnispecEntityTypings = IClassCompilerTypings<INodeTypeObjectEntity, INode>;

export abstract class GenericClassCompilerFromUnispecEntityHandler extends ClassCompilerHandler<IGenericClassCompilerFromUnispecEntityTypings> {}

export class GenericClassCompilerFromUnispecEntity extends ClassCompiler<IGenericClassCompilerFromUnispecEntityTypings> {
  GetNodeIdentifier(classContext: ICompileClassContext<IGenericClassCompilerFromUnispecEntityTypings>): string {
    return `${classContext.node["x-unispec-entity-id"]}`;
  }

  *GetNodeProperties(context: ICompileClassContext<IGenericClassCompilerFromUnispecEntityTypings>): Iterable<INodeProperty<IGenericClassCompilerFromUnispecEntityTypings>> {
    for (const [propertyKey, propertyNode] of Object.entries(context.node.properties)) {
      yield {
        propertyKey,
        propertyNode,
      };
    }
  }
}
