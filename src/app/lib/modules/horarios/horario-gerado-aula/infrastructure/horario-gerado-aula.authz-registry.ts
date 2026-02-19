import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createHorarioGeradoAulaRepository } from "./persistence/typeorm/horario-gerado-aula.repository";

export const HorarioGeradoAulaAuthzRegistrySetup = createAuthzRegistryProvider(
  "horario_gerado_aula",
  (ds) => createHorarioGeradoAulaRepository(ds),
);
