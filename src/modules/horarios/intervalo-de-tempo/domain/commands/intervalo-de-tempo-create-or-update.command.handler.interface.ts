import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoInputDto,
} from "../../application/dtos";

export type IIntervaloDeTempoCreateOrUpdateCommand = {
  accessContext: AccessContext | null;
  dto: IntervaloDeTempoInputDto;
};

export type IIntervaloDeTempoCreateOrUpdateCommandHandler = ICommandHandler<
  IIntervaloDeTempoCreateOrUpdateCommand,
  IntervaloDeTempoFindOneOutputDto
>;
export const IIntervaloDeTempoCreateOrUpdateCommandHandler = Symbol(
  "IIntervaloDeTempoCreateOrUpdateCommandHandler",
);
