import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createHorarioGeradoAulaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/HorarioGeradoAulaRepository";

export const HorarioGeradoAulaAuthzRegistrySetup = createAuthzRegistryProvider(
  "horario_gerado_aula",
  (ds) => createHorarioGeradoAulaRepository(ds),
);
