import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createHorarioGeradoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/horarios/horario-gerado/horario-gerado.repository";

export const HorarioGeradoAuthzRegistrySetup = createAuthzRegistryProvider("horario_gerado", (ds) =>
  createHorarioGeradoRepository(ds),
);
