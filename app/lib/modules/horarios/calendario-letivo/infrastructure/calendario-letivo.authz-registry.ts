import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const CalendarioLetivoAuthzRegistrySetup = createAuthzRegistryProvider(
  "calendario_letivo",
  (db) => db.calendarioLetivoRepository,
);
