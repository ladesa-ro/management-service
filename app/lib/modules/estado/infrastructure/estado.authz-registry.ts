import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const EstadoAuthzRegistrySetup = createAuthzRegistryProvider(
  "estado",
  (db) => db.estadoRepository,
  { actions: { find: true } },
);
