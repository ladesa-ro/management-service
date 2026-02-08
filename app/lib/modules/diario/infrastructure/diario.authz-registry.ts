import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const DiarioAuthzRegistrySetup = createAuthzRegistryProvider(
  "diario",
  (db) => db.diarioRepository,
);
