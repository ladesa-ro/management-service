import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const OfertaFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "oferta_formacao",
  (db) => db.ofertaFormacaoRepository,
);
