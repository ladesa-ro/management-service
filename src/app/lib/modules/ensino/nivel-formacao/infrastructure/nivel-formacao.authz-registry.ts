import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createNivelFormacaoRepository } from "./persistence/typeorm/nivel-formacao.repository";

export const NivelFormacaoAuthzRegistrySetup = createAuthzRegistryProvider("nivel_formacao", (ds) =>
  createNivelFormacaoRepository(ds),
);
