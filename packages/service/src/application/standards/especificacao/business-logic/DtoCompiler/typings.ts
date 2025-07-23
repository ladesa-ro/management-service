import { IDtoCompiler } from "@/application/standards/especificacao/business-logic/DtoCompiler/DtoCompiler";
import { SpecNodesStoreFromNpmPackage } from "@/application/standards/especificacao/business-logic/SpecNodesStore";

export type IDtoCompilerContext = {
  mode: "output" | "input" | "core";
  nodesStore: SpecNodesStoreFromNpmPackage;
  dtoCompiler: IDtoCompiler;
};
