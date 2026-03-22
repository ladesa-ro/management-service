import type { AccessContext } from "@/server/access-context";
import type { GerarHorarioEntity } from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

export interface IGerarHorarioAceitarCommand {
  id: string;
}

export const IGerarHorarioAceitarCommandHandler = Symbol("IGerarHorarioAceitarCommandHandler");

export interface IGerarHorarioAceitarCommandHandler {
  execute(
    accessContext: AccessContext | null,
    command: IGerarHorarioAceitarCommand,
  ): Promise<GerarHorarioEntity>;
}
