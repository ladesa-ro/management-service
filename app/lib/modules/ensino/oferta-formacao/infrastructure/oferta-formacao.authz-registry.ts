import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const OfertaFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "oferta_formacao",
  (db) => db.ofertaFormacaoRepository,
);
