import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { HorarioEdicaoMudancaTipoOperacao } from "../infrastructure.database/typeorm/horario-edicao-mudanca.typeorm.entity";

export class HorarioEdicaoSessaoParamsRestDto {
  @ApiProperty()
  sessaoId!: string;
}

export class HorarioEdicaoMudancaInputRestDto {
  @ApiPropertyOptional()
  calendarioAgendamentoId?: string;

  @ApiProperty({ enum: HorarioEdicaoMudancaTipoOperacao })
  tipoOperacao!: HorarioEdicaoMudancaTipoOperacao;

  @ApiProperty()
  dados!: Record<string, unknown>;
}

export class HorarioEdicaoSessaoOutputRestDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  idUsuarioFk!: string;

  @ApiProperty()
  dateCreated!: Date;

  @ApiProperty()
  dateUpdated!: Date;
}

export class HorarioEdicaoMudancaOutputRestDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  idSessaoFk!: string;

  @ApiPropertyOptional()
  idCalendarioAgendamentoFk!: string | null;

  @ApiProperty()
  tipoOperacao!: string;

  @ApiProperty()
  dados!: Record<string, unknown>;

  @ApiProperty()
  dateCreated!: Date;
}
