import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const OfertaFormacaoNivelFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "oferta_formacao_nivel_formacao",
  (db) => db.ofertaFormacaoNivelFormacaoRepository,
);
