import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createCampusRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateCampusRepository";

export const CampusAuthzRegistrySetup = createAuthzRegistryProvider("campus", (ds) =>
  createCampusRepository(ds),
);
