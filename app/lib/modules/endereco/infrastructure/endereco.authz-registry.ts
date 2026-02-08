import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const EnderecoAuthzRegistrySetup = createAuthzRegistryProvider(
  "endereco",
  (db) => db.enderecoRepository,
  { actions: { find: true } },
);
