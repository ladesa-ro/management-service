import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const ReservaAuthzRegistrySetup = createAuthzRegistryProvider(
  "reserva",
  (db) => db.reservaRepository,
);
