import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createNivelFormacaoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/NivelFormacaoRepository";

export const NivelFormacaoAuthzRegistrySetup = createAuthzRegistryProvider("nivel_formacao", (ds) =>
  createNivelFormacaoRepository(ds),
);
