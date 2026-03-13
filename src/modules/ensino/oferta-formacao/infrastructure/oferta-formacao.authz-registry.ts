import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createOfertaFormacaoRepository } from "./persistence/typeorm/oferta-formacao.repository";

export const OfertaFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "oferta_formacao",
  (ds) => createOfertaFormacaoRepository(ds),
);
