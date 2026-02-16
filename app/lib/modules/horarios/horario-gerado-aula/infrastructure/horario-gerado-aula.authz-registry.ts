import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const HorarioGeradoAulaAuthzRegistrySetup = createAuthzRegistryProvider(
  "horario_gerado_aula",
  (db) => db.horarioGeradoAulaRepository,
);
