import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { GerarHorarioEntity } from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

export interface IGerarHorarioRejeitarCommand {
  id: string;
}

export const IGerarHorarioRejeitarCommandHandler = Symbol("IGerarHorarioRejeitarCommandHandler");

export interface IGerarHorarioRejeitarCommandHandler {
  execute(
    accessContext: AccessContext | null,
    command: IGerarHorarioRejeitarCommand,
  ): Promise<GerarHorarioEntity>;
}
