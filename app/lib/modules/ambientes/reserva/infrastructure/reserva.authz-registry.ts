import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const ReservaAuthzRegistrySetup = createAuthzRegistryProvider(
  "reserva",
  (db) => db.reservaRepository,
);
