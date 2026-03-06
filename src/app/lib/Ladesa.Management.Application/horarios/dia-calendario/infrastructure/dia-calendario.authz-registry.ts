import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createDiaCalendarioRepository } from "./persistence/typeorm/dia-calendario.repository";

export const DiaCalendarioAuthzRegistrySetup = createAuthzRegistryProvider("dia_calendario", (ds) =>
  createDiaCalendarioRepository(ds),
);
