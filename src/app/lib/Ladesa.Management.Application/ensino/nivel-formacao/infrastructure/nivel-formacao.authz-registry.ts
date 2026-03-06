import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createNivelFormacaoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ensino/nivel-formacao/nivel-formacao.repository";

export const NivelFormacaoAuthzRegistrySetup = createAuthzRegistryProvider("nivel_formacao", (ds) =>
  createNivelFormacaoRepository(ds),
);
