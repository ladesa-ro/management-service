import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createModalidadeRepository } from "./persistence/typeorm/modalidade.repository";

export const ModalidadeAuthzRegistrySetup = createAuthzRegistryProvider("modalidade", (ds) =>
  createModalidadeRepository(ds),
);
