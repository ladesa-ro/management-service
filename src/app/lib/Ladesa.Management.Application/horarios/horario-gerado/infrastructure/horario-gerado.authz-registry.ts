import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createHorarioGeradoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateHorarioGeradoRepository";

export const HorarioGeradoAuthzRegistrySetup = createAuthzRegistryProvider("horario_gerado", (ds) =>
  createHorarioGeradoRepository(ds),
);
