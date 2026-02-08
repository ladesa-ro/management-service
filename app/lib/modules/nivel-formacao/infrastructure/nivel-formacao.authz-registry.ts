import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const NivelFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "nivel_formacao",
  (db) => db.nivelFormacaoRepository,
);
