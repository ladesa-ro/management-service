import {
  GenericClassCompilerFromUnispecEntityHandler,
  IGenericClassCompilerFromUnispecEntityTypings,
} from "@/application/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Core/GenericClassCompilerFromUnispecEntity";
import { GraphQlNodeCompiler } from "@/application/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Integrations/GraphQl/GraphQlNodeCompiler";
import { ICompileClassContext, ICompileClassPropertyContext } from "@/application/standards/especificacao/infrastructure/utils/class-compiler";

export class GraphQlClassCompilerFromUnispecEntityHandler extends GenericClassCompilerFromUnispecEntityHandler {
  public graphQlNodeCompiler = new GraphQlNodeCompiler();

  HandleClass(classContext: ICompileClassContext<IGenericClassCompilerFromUnispecEntityTypings>): void {}

  HandleClassProperty(classPropertyContext: ICompileClassPropertyContext<IGenericClassCompilerFromUnispecEntityTypings>): void {}
}
