import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createOfertaFormacaoRepository } from "./persistence/typeorm/oferta-formacao.repository";

export const OfertaFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "oferta_formacao",
  (ds) => createOfertaFormacaoRepository(ds),
);
