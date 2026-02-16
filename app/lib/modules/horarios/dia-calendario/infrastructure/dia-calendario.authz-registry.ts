import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const DiaCalendarioAuthzRegistrySetup = createAuthzRegistryProvider(
  "dia_calendario",
  (db) => db.diaCalendarioRepository,
);
