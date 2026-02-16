import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const EstadoAuthzRegistrySetup = createAuthzRegistryProvider(
  "estado",
  (db) => db.estadoRepository,
  { actions: { find: true } },
);
