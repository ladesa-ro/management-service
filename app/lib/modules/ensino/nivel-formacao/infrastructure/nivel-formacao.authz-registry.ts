import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const NivelFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "nivel_formacao",
  (db) => db.nivelFormacaoRepository,
);
