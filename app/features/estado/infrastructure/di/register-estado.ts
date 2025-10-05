import type { Container } from "inversify";
import { EstadoHttpRegistrar } from "@/features";
import { ESTADO_REPOSITORY, ESTADO_USE_CASES } from "@/features/estado/application/ports";
import { EstadoApplicationService } from "@/features/estado/application/services";
import { EstadoRepositoryAdapter } from "@/features/estado/infrastructure";
import { ROUTE_REGISTRAR } from "@/shared";

export const registerEstado = (container: Container) => {
  container.bind(ESTADO_REPOSITORY).to(EstadoRepositoryAdapter).inSingletonScope();
  container.bind(ESTADO_USE_CASES).to(EstadoApplicationService).inSingletonScope();

  container.bind(ROUTE_REGISTRAR).to(EstadoHttpRegistrar).inSingletonScope();
};
