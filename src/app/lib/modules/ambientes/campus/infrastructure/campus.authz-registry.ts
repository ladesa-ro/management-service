import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createCampusRepository } from "./persistence/typeorm/campus.repository";

export const CampusAuthzRegistrySetup = createAuthzRegistryProvider("campus", (ds) =>
  createCampusRepository(ds),
);
