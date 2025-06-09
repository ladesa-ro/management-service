import { IClassCompilerHandler, IClassCompilerTypings, ICompileClassContext, ICompileClassPropertyContext } from "@/application/standards/especificacao/infrastructure/utils/class-compiler/typings";

export abstract class ClassCompilerHandler<CompileClassTypings extends IClassCompilerTypings> implements IClassCompilerHandler<CompileClassTypings> {
  HandleClass(classContext: ICompileClassContext<CompileClassTypings>): void {
    throw new Error("Method not implemented.");
  }

  HandleClassProperty(classPropertyContext: ICompileClassPropertyContext<CompileClassTypings>): void {
    throw new Error("Method not implemented.");
  }
}
