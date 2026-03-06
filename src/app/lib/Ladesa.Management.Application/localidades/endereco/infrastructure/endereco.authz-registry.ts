import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createEnderecoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/localidades/endereco/endereco.repository";

export const EnderecoAuthzRegistrySetup = createAuthzRegistryProvider(
  "endereco",
  (ds) => createEnderecoRepository(ds),
  { actions: { find: true } },
);
