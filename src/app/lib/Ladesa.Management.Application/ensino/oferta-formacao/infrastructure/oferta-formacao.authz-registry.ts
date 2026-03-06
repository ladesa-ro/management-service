import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createOfertaFormacaoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/OfertaFormacaoRepository";

export const OfertaFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "oferta_formacao",
  (ds) => createOfertaFormacaoRepository(ds),
);
