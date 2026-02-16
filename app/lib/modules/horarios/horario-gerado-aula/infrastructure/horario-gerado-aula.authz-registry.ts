import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const HorarioGeradoAulaAuthzRegistrySetup = createAuthzRegistryProvider(
  "horario_gerado_aula",
  (db) => db.horarioGeradoAulaRepository,
);
