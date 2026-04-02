import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { PerfilFindOneQueryResult } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query.result";
import { AmbienteFindOneQueryResult } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.result";
import { CalendarioLetivoFindOneQueryResult } from "@/modules/calendario/letivo/domain/queries/calendario-letivo-find-one.query.result";
import { DiarioFindOneQueryResult } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.result";
import { ModalidadeFindOneQueryResult } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.result";
import { OfertaFormacaoFindOneQueryResult } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.result";
import { TurmaFindOneQueryResult } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.result";
import { CalendarioAgendamentoFields } from "../calendario-agendamento.fields";
import type {
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "../calendario-agendamento.types";

export const CalendarioAgendamentoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CalendarioAgendamentoFields,
};

export class CalendarioAgendamentoFindOneQueryResult extends EntityQueryResult {
  identificadorExterno!: string;
  tipo!: CalendarioAgendamentoTipo;
  nome!: string | null;
  dataInicio!: string;
  dataFim!: string | null;
  diaInteiro!: boolean;
  horarioInicio!: string;
  horarioFim!: string;
  cor!: string | null;
  repeticao!: string | null;
  status!: CalendarioAgendamentoStatus | null;
  version!: number;

  turmas!: TurmaFindOneQueryResult[];
  perfis!: PerfilFindOneQueryResult[];
  calendariosLetivos!: CalendarioLetivoFindOneQueryResult[];
  ofertasFormacao!: OfertaFormacaoFindOneQueryResult[];
  modalidades!: ModalidadeFindOneQueryResult[];
  ambientes!: AmbienteFindOneQueryResult[];
  diarios!: DiarioFindOneQueryResult[];
}
