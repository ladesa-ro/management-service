import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const PerfilAuthzRegistrySetup = createAuthzRegistryProvider(
  "vinculo",
  (db) => db.perfilRepository,
  { actions: { find: true } },
);
