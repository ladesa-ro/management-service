import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createModalidadeRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ModalidadeRepository";

export const ModalidadeAuthzRegistrySetup = createAuthzRegistryProvider("modalidade", (ds) =>
  createModalidadeRepository(ds),
);
