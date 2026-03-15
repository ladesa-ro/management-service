import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsUUID,
  Matches,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { EstagioStatus } from "../estagio";

export class HorarioEstagioInputCommand {
  @IsInt()
  @Min(0)
  @Max(6)
  diaSemana!: number;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/)
  horaInicio!: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/)
  horaFim!: string;
}

export class EstagioCreateCommand {
  @IsUUID("4")
  idEmpresaFk!: string;

  @IsUUID("4")
  @IsOptional()
  idEstagiarioFk?: string;

  @IsInt()
  @Min(1)
  cargaHoraria!: number;

  @IsDateString()
  @IsOptional()
  dataInicio?: string;

  @IsDateString()
  @IsOptional()
  dataFim?: string;

  @IsEnum(EstagioStatus)
  @IsOptional()
  status?: EstagioStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioEstagioInputCommand)
  @IsOptional()
  horariosEstagio?: HorarioEstagioInputCommand[];
}
