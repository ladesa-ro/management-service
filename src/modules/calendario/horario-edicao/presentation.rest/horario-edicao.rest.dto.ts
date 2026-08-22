import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { HorarioEdicaoMudancaTipoOperacao } from "../infrastructure.database/typeorm/horario-edicao-mudanca.typeorm.entity";

export class HorarioEdicaoSessaoParamsRestDto {
  @ApiProperty()
  sessaoId!: string;
}

export class HorarioEdicaoMudancaParamsRestDto {
  @ApiProperty()
  sessaoId!: string;

  @ApiProperty()
  mudancaId!: string;
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
  dateCreated!: string;

  @ApiProperty()
  dateUpdated!: string;
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

  @ApiPropertyOptional({
    description: "Estado antes desta mudança — nulo para CRIAR",
  })
  dadosAnteriores!: Record<string, unknown> | null;

  @ApiProperty()
  dateCreated!: string;
}

export class HorarioEdicaoDiferencaEntradaOutputRestDto {
  @ApiProperty({ enum: HorarioEdicaoMudancaTipoOperacao })
  tipoOperacao!: "CRIAR" | "MOVER" | "REMOVER";

  @ApiPropertyOptional()
  calendarioAgendamentoId!: string | null;

  @ApiPropertyOptional()
  antes!: Record<string, unknown> | null;

  @ApiPropertyOptional()
  depois!: Record<string, unknown> | null;
}

export class HorarioEdicaoSessaoDiferencaOutputRestDto {
  @ApiProperty()
  sessaoId!: string;

  @ApiProperty({ type: [HorarioEdicaoDiferencaEntradaOutputRestDto] })
  entram!: HorarioEdicaoDiferencaEntradaOutputRestDto[];

  @ApiProperty({ type: [HorarioEdicaoDiferencaEntradaOutputRestDto] })
  saem!: HorarioEdicaoDiferencaEntradaOutputRestDto[];

  @ApiProperty({ type: [HorarioEdicaoDiferencaEntradaOutputRestDto] })
  mudam!: HorarioEdicaoDiferencaEntradaOutputRestDto[];
}
