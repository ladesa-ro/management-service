import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const OfertaFormacaoNivelFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "oferta_formacao_nivel_formacao",
  (db) => db.ofertaFormacaoNivelFormacaoRepository,
);
