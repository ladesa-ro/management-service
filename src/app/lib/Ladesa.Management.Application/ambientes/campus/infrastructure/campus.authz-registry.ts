import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createCampusRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ambientes/campus/campus.repository";

export const CampusAuthzRegistrySetup = createAuthzRegistryProvider("campus", (ds) =>
  createCampusRepository(ds),
);
