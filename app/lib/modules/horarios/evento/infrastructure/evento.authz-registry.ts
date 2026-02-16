import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const EventoAuthzRegistrySetup = createAuthzRegistryProvider(
  "evento",
  (db) => db.eventoRepository,
);
