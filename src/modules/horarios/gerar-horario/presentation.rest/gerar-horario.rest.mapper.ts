import type { GerarHorarioEntity } from "../infrastructure.database/typeorm/gerar-horario.typeorm.entity";
import { GerarHorarioFindOneOutputRestDto } from "./gerar-horario.rest.dto";

export class GerarHorarioRestMapper {
  static toFindOneOutputDto(entity: GerarHorarioEntity): GerarHorarioFindOneOutputRestDto {
    const dto = new GerarHorarioFindOneOutputRestDto();
    dto.id = entity.id;
    dto.status = entity.status;
    dto.duracao = entity.duracao;
    dto.dataInicio =
      entity.dataInicio instanceof Date
        ? entity.dataInicio.toISOString().split("T")[0]
        : String(entity.dataInicio);
    dto.dataTermino =
      entity.dataTermino instanceof Date
        ? entity.dataTermino.toISOString().split("T")[0]
        : entity.dataTermino
          ? String(entity.dataTermino)
          : null;
    dto.respostaGerador = entity.respostaGerador;
    dto.dateCreated =
      entity.dateCreated instanceof Date
        ? entity.dateCreated.toISOString()
        : String(entity.dateCreated);
    return dto;
  }
}
