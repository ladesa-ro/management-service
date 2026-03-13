import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createModalidadeRepository } from "./persistence/typeorm/modalidade.repository";

export const ModalidadeAuthzRegistrySetup = createAuthzRegistryProvider("modalidade", (ds) =>
  createModalidadeRepository(ds),
);
