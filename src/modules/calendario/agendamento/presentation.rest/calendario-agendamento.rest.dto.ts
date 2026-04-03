import {
  PerfilFindOneInputRestDto,
  PerfilFindOneOutputRestDto,
} from "@/modules/acesso/usuario/perfil/presentation.rest/perfil.rest.dto";
import {
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
} from "@/modules/ambientes/ambiente/presentation.rest/ambiente.rest.dto";
import { CalendarioEventoFields } from "@/modules/calendario/agendamento/domain/calendario-evento.fields";
import {
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
} from "@/modules/calendario/letivo/presentation.rest/calendario-letivo.rest.dto";
import {
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
} from "@/modules/ensino/diario/presentation.rest/diario.rest.dto";
import {
  ModalidadeFindOneInputRestDto,
  ModalidadeFindOneOutputRestDto,
} from "@/modules/ensino/modalidade/presentation.rest/modalidade.rest.dto";
import {
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
} from "@/modules/ensino/oferta-formacao/presentation.rest/oferta-formacao.rest.dto";
import {
  TurmaFindOneInputRestDto,
  TurmaFindOneOutputRestDto,
} from "@/modules/ensino/turma/presentation.rest/turma.rest.dto";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

// ============================================================================
// Create Input
// ============================================================================

@ApiSchema({ name: "CalendarioAgendamentoCreateInputDto" })
export class CalendarioAgendamentoCreateInputRestDto {
  @ApiProperty({
    ...CalendarioEventoFields.tipo.swaggerMetadata,
    enum: ["INDISPONIBILIDADE", "AULA", "EVENTO", "RESERVA"],
    description: "Tipo de agendamento (AULA, EVENTO, INDISPONIBILIDADE, RESERVA)",
  })
  tipo: string;

  @ApiProperty(CalendarioEventoFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(CalendarioEventoFields.dataInicio.swaggerMetadata)
  dataInicio: string;

  @ApiPropertyOptional(CalendarioEventoFields.dataFim.swaggerMetadata)
  dataFim?: string;

  @ApiProperty(CalendarioEventoFields.diaInteiro.swaggerMetadata)
  diaInteiro: boolean;

  @ApiPropertyOptional(CalendarioEventoFields.horarioInicio.swaggerMetadata)
  horarioInicio?: string;

  @ApiPropertyOptional(CalendarioEventoFields.horarioFim.swaggerMetadata)
  horarioFim?: string;

  @ApiPropertyOptional(CalendarioEventoFields.cor.swaggerMetadata)
  cor?: string;

  @ApiPropertyOptional(CalendarioEventoFields.repeticao.swaggerMetadata)
  repeticao?: string;

  @ApiPropertyOptional({
    ...CalendarioEventoFields.turmas.swaggerMetadata,
    type: () => [TurmaFindOneInputRestDto],
  })
  turmas?: TurmaFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.perfis.swaggerMetadata,
    type: () => [PerfilFindOneInputRestDto],
  })
  perfis?: PerfilFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.calendariosLetivos.swaggerMetadata,
    type: () => [CalendarioLetivoFindOneInputRestDto],
  })
  calendariosLetivos?: CalendarioLetivoFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.ofertasFormacao.swaggerMetadata,
    type: () => [OfertaFormacaoFindOneInputRestDto],
  })
  ofertasFormacao?: OfertaFormacaoFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.modalidades.swaggerMetadata,
    type: () => [ModalidadeFindOneInputRestDto],
  })
  modalidades?: ModalidadeFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.ambientes.swaggerMetadata,
    type: () => [AmbienteFindOneInputRestDto],
  })
  ambientes?: AmbienteFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.diarios.swaggerMetadata,
    type: () => [DiarioFindOneInputRestDto],
  })
  diarios?: DiarioFindOneInputRestDto[];
}

// ============================================================================
// Update Input
// ============================================================================

@ApiSchema({ name: "CalendarioAgendamentoUpdateInputDto" })
export class CalendarioAgendamentoUpdateInputRestDto {
  @ApiPropertyOptional({
    ...CalendarioEventoFields.tipo.swaggerMetadata,
    enum: ["INDISPONIBILIDADE", "AULA", "EVENTO", "RESERVA"],
    description: "Tipo de agendamento (AULA, EVENTO, INDISPONIBILIDADE, RESERVA)",
  })
  tipo?: string;

  @ApiPropertyOptional(CalendarioEventoFields.nome.swaggerMetadata) nome?: string;
  @ApiPropertyOptional(CalendarioEventoFields.dataInicio.swaggerMetadata) dataInicio?: string;
  @ApiPropertyOptional(CalendarioEventoFields.dataFim.swaggerMetadata) dataFim?: string;
  @ApiPropertyOptional(CalendarioEventoFields.diaInteiro.swaggerMetadata) diaInteiro?: boolean;
  @ApiPropertyOptional(CalendarioEventoFields.horarioInicio.swaggerMetadata) horarioInicio?: string;
  @ApiPropertyOptional(CalendarioEventoFields.horarioFim.swaggerMetadata) horarioFim?: string;
  @ApiPropertyOptional(CalendarioEventoFields.cor.swaggerMetadata) cor?: string;
  @ApiPropertyOptional(CalendarioEventoFields.repeticao.swaggerMetadata) repeticao?: string;

  @ApiPropertyOptional({
    ...CalendarioEventoFields.turmas.swaggerMetadata,
    type: () => [TurmaFindOneInputRestDto],
  })
  turmas?: TurmaFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.perfis.swaggerMetadata,
    type: () => [PerfilFindOneInputRestDto],
  })
  perfis?: PerfilFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.calendariosLetivos.swaggerMetadata,
    type: () => [CalendarioLetivoFindOneInputRestDto],
  })
  calendariosLetivos?: CalendarioLetivoFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.ofertasFormacao.swaggerMetadata,
    type: () => [OfertaFormacaoFindOneInputRestDto],
  })
  ofertasFormacao?: OfertaFormacaoFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.modalidades.swaggerMetadata,
    type: () => [ModalidadeFindOneInputRestDto],
  })
  modalidades?: ModalidadeFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.ambientes.swaggerMetadata,
    type: () => [AmbienteFindOneInputRestDto],
  })
  ambientes?: AmbienteFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.diarios.swaggerMetadata,
    type: () => [DiarioFindOneInputRestDto],
  })
  diarios?: DiarioFindOneInputRestDto[];
}

// ============================================================================
// Params
// ============================================================================

@ApiSchema({ name: "CalendarioAgendamentoFindOneParamsDto" })
export class CalendarioAgendamentoFindOneParamsRestDto {
  @ApiProperty(CalendarioEventoFields.id.swaggerMetadata)
  id: string;
}

// ============================================================================
// Output (reutiliza o mesmo output — tipo já existe nele)
// ============================================================================

@ApiSchema({ name: "CalendarioAgendamentoFindOneOutputDto" })
export class CalendarioAgendamentoFindOneOutputRestDto {
  @ApiProperty(CalendarioEventoFields.id.swaggerMetadata) id: string;

  @ApiProperty({ type: "string", format: "uuid", description: "Identificador externo estavel" })
  identificadorExterno: string;

  @ApiProperty(CalendarioEventoFields.tipo.swaggerMetadata) tipo: string;
  @ApiPropertyOptional(CalendarioEventoFields.nome.swaggerMetadata) nome: string | null;
  @ApiProperty(CalendarioEventoFields.dataInicio.swaggerMetadata) dataInicio: string;
  @ApiPropertyOptional(CalendarioEventoFields.dataFim.swaggerMetadata) dataFim: string | null;
  @ApiProperty(CalendarioEventoFields.diaInteiro.swaggerMetadata) diaInteiro: boolean;
  @ApiProperty(CalendarioEventoFields.horarioInicio.swaggerMetadata) horarioInicio: string;
  @ApiProperty(CalendarioEventoFields.horarioFim.swaggerMetadata) horarioFim: string;
  @ApiPropertyOptional(CalendarioEventoFields.cor.swaggerMetadata) cor: string | null;
  @ApiPropertyOptional(CalendarioEventoFields.repeticao.swaggerMetadata) repeticao: string | null;
  @ApiPropertyOptional(CalendarioEventoFields.status.swaggerMetadata) status: string | null;
  @ApiProperty({ type: "integer", description: "Numero da versao" }) version: number;

  @ApiPropertyOptional({
    ...CalendarioEventoFields.turmas.swaggerMetadata,
    type: () => [TurmaFindOneOutputRestDto],
  })
  turmas: TurmaFindOneOutputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.perfis.swaggerMetadata,
    type: () => [PerfilFindOneOutputRestDto],
  })
  perfis: PerfilFindOneOutputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.calendariosLetivos.swaggerMetadata,
    type: () => [CalendarioLetivoFindOneOutputRestDto],
  })
  calendariosLetivos: CalendarioLetivoFindOneOutputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.ofertasFormacao.swaggerMetadata,
    type: () => [OfertaFormacaoFindOneOutputRestDto],
  })
  ofertasFormacao: OfertaFormacaoFindOneOutputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.modalidades.swaggerMetadata,
    type: () => [ModalidadeFindOneOutputRestDto],
  })
  modalidades: ModalidadeFindOneOutputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.ambientes.swaggerMetadata,
    type: () => [AmbienteFindOneOutputRestDto],
  })
  ambientes: AmbienteFindOneOutputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.diarios.swaggerMetadata,
    type: () => [DiarioFindOneOutputRestDto],
  })
  diarios: DiarioFindOneOutputRestDto[];
}
