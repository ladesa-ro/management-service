import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const DiaCalendarioAuthzRegistrySetup = createAuthzRegistryProvider(
  "dia_calendario",
  (db) => db.diaCalendarioRepository,
);
