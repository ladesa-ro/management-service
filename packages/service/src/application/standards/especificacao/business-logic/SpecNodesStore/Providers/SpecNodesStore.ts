import { SpecNodesStoreFromNpmPackage } from "@/application/standards/especificacao/business-logic/SpecNodesStore/Sources/SpecNodesStoreFromNpmPackage";

export const especificacaoNodesStore = new SpecNodesStoreFromNpmPackage();

export const getSpecNodesStore = () => {
  return especificacaoNodesStore;
};
