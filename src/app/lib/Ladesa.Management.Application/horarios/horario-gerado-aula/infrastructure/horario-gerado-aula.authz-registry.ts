import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createHorarioGeradoAulaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/horarios/horario-gerado-aula/horario-gerado-aula.repository";

export const HorarioGeradoAulaAuthzRegistrySetup = createAuthzRegistryProvider(
  "horario_gerado_aula",
  (ds) => createHorarioGeradoAulaRepository(ds),
);
