import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const EnderecoAuthzRegistrySetup = createAuthzRegistryProvider(
  "endereco",
  (db) => db.enderecoRepository,
  { actions: { find: true } },
);
