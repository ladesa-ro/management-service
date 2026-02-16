import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const CalendarioLetivoAuthzRegistrySetup = createAuthzRegistryProvider(
  "calendario_letivo",
  (db) => db.calendarioLetivoRepository,
);
