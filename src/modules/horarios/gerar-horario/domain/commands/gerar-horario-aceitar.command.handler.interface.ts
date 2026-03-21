import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { GerarHorarioEntity } from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

export interface IGerarHorarioAceitarCommand {
  id: string;
}

export interface IGerarHorarioAceitarCommandHandler {
  execute(
    accessContext: AccessContext | null,
    command: IGerarHorarioAceitarCommand,
  ): Promise<GerarHorarioEntity>;
}

export const IGerarHorarioAceitarCommandHandler = Symbol("IGerarHorarioAceitarCommandHandler");
