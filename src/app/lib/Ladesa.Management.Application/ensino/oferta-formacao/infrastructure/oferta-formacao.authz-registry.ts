import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createOfertaFormacaoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ensino/oferta-formacao/oferta-formacao.repository";

export const OfertaFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "oferta_formacao",
  (ds) => createOfertaFormacaoRepository(ds),
);
