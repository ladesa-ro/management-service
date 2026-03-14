import { EntityQueryResult } from "@/domain/abstractions";
import { AmbienteFindOneQueryResult } from "@/modules/ambientes/ambiente";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import { DisciplinaFindOneQueryResult } from "@/modules/ensino/disciplina";
import { TurmaFindOneQueryResult } from "@/modules/ensino/turma";
import { CalendarioLetivoFindOneQueryResult } from "@/modules/horarios/calendario-letivo";

export class DiarioFindOneQueryResult extends EntityQueryResult {
  ativo!: boolean;
  calendarioLetivo!: CalendarioLetivoFindOneQueryResult;
  turma!: TurmaFindOneQueryResult;
  disciplina!: DisciplinaFindOneQueryResult;
  ambientePadrao!: AmbienteFindOneQueryResult | null;
  imagemCapa!: ImagemFindOneQueryResult | null;
}
