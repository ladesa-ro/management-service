import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createEnderecoRepository } from "./persistence/typeorm/endereco.repository";

export const EnderecoAuthzRegistrySetup = createAuthzRegistryProvider(
  "endereco",
  (ds) => createEnderecoRepository(ds),
  { actions: { find: true } },
);
