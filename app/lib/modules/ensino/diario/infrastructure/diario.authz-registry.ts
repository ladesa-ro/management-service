import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const DiarioAuthzRegistrySetup = createAuthzRegistryProvider(
  "diario",
  (db) => db.diarioRepository,
);
