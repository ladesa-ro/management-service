import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const ModalidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "modalidade",
  (db) => db.modalidadeRepository,
);
