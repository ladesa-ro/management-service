import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createOfertaFormacaoNivelFormacaoRepository } from "./persistence/typeorm/oferta-formacao-nivel-formacao.repository";

export const OfertaFormacaoNivelFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "oferta_formacao_nivel_formacao",
  (ds) => createOfertaFormacaoNivelFormacaoRepository(ds),
);
