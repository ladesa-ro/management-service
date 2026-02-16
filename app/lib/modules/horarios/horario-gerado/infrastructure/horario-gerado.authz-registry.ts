import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const HorarioGeradoAuthzRegistrySetup = createAuthzRegistryProvider(
  "horario_gerado",
  (db) => db.horarioGeradoRepository,
);
