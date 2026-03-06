import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createDisponibilidadeRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/DisponibilidadeRepository";

export const DisponibilidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "disponibilidade",
  (ds) => createDisponibilidadeRepository(ds),
);
