import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const BlocoAuthzRegistrySetup = createAuthzRegistryProvider(
  "bloco",
  (db) => db.blocoRepository,
);
