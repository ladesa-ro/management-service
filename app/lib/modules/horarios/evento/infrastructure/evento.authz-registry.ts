import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const EventoAuthzRegistrySetup = createAuthzRegistryProvider(
  "evento",
  (db) => db.eventoRepository,
);
