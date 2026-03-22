import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { PerfilListQueryResult } from "../queries";
import type { PerfilSetVinculosCommand } from "./perfil-set-vinculos.command";

export const PerfilSetVinculosCommandMetadata = createOperationMetadata({
  operationId: "perfilSetVinculos",
  summary: "Define vinculos (cargos) de um usuario em um campus",
  description:
    "Define os cargos que um usuario possui em um campus. " +
    "Cargos existentes que nao estiverem na lista serao desativados. " +
    "Cargos novos serao criados ou reativados.",
});

export const IPerfilSetVinculosCommandHandler = Symbol("IPerfilSetVinculosCommandHandler");

export type IPerfilSetVinculosCommandHandler = ICommandHandler<
  PerfilSetVinculosCommand,
  PerfilListQueryResult
>;
