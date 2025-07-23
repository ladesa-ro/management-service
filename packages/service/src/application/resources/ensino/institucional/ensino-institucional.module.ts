import { NivelFormacaoModule } from "@/application/resources/ensino/institucional/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoNivelFormacaoModule } from "@/application/resources/ensino/institucional/oferta-formacao-nivel-formacao/oferta-formacao-nivel-formacao.module";
import { OfertaFormacaoModule } from "@/application/resources/ensino/institucional/oferta-formacao/oferta-formacao.module";
import { Module } from "@nestjs/common";
import { CursoModule } from "./curso/curso.module";
import { DisciplinaModule } from "./disciplina/disciplina.module";
import { ModalidadeModule } from "./modalidade/modalidade.module";

@Module({
  imports: [NivelFormacaoModule, ModalidadeModule, OfertaFormacaoModule, OfertaFormacaoNivelFormacaoModule, CursoModule, DisciplinaModule],
})
export class EnsinoInstitucionalModule {}
