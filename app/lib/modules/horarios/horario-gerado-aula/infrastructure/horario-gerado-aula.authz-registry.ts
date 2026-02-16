import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createHorarioGeradoAulaRepository } from "./persistence/typeorm/horario-gerado-aula.repository";

export const HorarioGeradoAulaAuthzRegistrySetup = createAuthzRegistryProvider(
  "horario_gerado_aula",
  (ds) => createHorarioGeradoAulaRepository(ds),
);
