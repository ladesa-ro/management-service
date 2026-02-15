import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const ModalidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "modalidade",
  (db) => db.modalidadeRepository,
);
