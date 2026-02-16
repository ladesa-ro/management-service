import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const BlocoAuthzRegistrySetup = createAuthzRegistryProvider(
  "bloco",
  (db) => db.blocoRepository,
);
