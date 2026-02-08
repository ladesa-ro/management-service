import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const HorarioGeradoAuthzRegistrySetup = createAuthzRegistryProvider(
  "horario_gerado",
  (db) => db.horarioGeradoRepository,
);
