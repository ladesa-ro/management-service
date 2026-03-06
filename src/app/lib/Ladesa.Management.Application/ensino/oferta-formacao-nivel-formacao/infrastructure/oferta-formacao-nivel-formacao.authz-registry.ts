import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createOfertaFormacaoNivelFormacaoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ensino/oferta-formacao-nivel-formacao/oferta-formacao-nivel-formacao.repository";

export const OfertaFormacaoNivelFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "oferta_formacao_nivel_formacao",
  (ds) => createOfertaFormacaoNivelFormacaoRepository(ds),
);
