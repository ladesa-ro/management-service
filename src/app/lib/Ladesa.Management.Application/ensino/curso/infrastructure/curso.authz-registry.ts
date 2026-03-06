import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createCursoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CursoRepository";

export const CursoAuthzRegistrySetup = createAuthzRegistryProvider("curso", (ds) =>
  createCursoRepository(ds),
);
