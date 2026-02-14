// Re-export all entities from their respective modules for backwards compatibility
// Import directly from entity files to avoid circular dependencies with adapters

export { PerfilEntity } from "@/modules/acesso/perfil/infrastructure/persistence/typeorm/perfil.entity";
export { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure/persistence/typeorm/usuario.entity";
export { ArquivoEntity } from "@/modules/base/armazenamento/arquivo/infrastructure/persistence/typeorm/arquivo.entity";
export { ImagemEntity } from "@/modules/base/armazenamento/imagem/infrastructure/persistence/typeorm/imagem.entity";
export { ImagemArquivoEntity } from "@/modules/base/armazenamento/imagem-arquivo/infrastructure/persistence/typeorm/imagem-arquivo.entity";
export { CidadeEntity } from "@/modules/base/localidades/cidade/infrastructure/persistence/typeorm/cidade.entity";
export { EnderecoEntity } from "@/modules/base/localidades/endereco/infrastructure/persistence/typeorm/endereco.entity";
export { EstadoEntity } from "@/modules/base/localidades/estado/infrastructure/persistence/typeorm/estado.entity";
export { CursoEntity } from "@/modules/ensino/curso/infrastructure/persistence/typeorm/curso.entity";
export { DiarioEntity } from "@/modules/ensino/diario/infrastructure/persistence/typeorm/diario.entity";
export { DiarioPreferenciaAgrupamentoEntity } from "@/modules/ensino/diario-preferencia-agrupamento/infrastructure/persistence/typeorm/diario-preferencia-agrupamento.entity";
export { DiarioProfessorEntity } from "@/modules/ensino/diario-professor/infrastructure/persistence/typeorm/diario-professor.entity";
export { DisciplinaEntity } from "@/modules/ensino/disciplina/infrastructure/persistence/typeorm/disciplina.entity";
export { DisponibilidadeEntity } from "@/modules/ensino/disponibilidade/infrastructure/persistence/typeorm/disponibilidade.entity";
export { EtapaEntity } from "@/modules/ensino/etapa/infrastructure/persistence/typeorm/etapa.entity";
export { ModalidadeEntity } from "@/modules/ensino/modalidade/infrastructure/persistence/typeorm/modalidade.entity";
export { NivelFormacaoEntity } from "@/modules/ensino/nivel-formacao/infrastructure/persistence/typeorm/nivel-formacao.entity";
export { OfertaFormacaoEntity } from "@/modules/ensino/oferta-formacao/infrastructure/persistence/typeorm/oferta-formacao.entity";
export { OfertaFormacaoNivelFormacaoEntity } from "@/modules/ensino/oferta-formacao-nivel-formacao/infrastructure/persistence/typeorm/oferta-formacao-nivel-formacao.entity";
export { ProfessorIndisponibilidadeEntity } from "@/modules/ensino/professor-indisponibilidade/infrastructure/persistence/typeorm/professor-indisponibilidade.entity";
export { TurmaEntity } from "@/modules/ensino/turma/infrastructure/persistence/typeorm/turma.entity";
export { TurmaDisponibilidadeEntity } from "@/modules/ensino/turma-disponibilidade/infrastructure/persistence/typeorm/turma-disponibilidade.entity";
export { AmbienteEntity } from "@/modules/sisgea/ambiente/infrastructure/persistence/typeorm/ambiente.entity";
export { BlocoEntity } from "@/modules/sisgea/bloco/infrastructure/persistence/typeorm/bloco.entity";
export { CampusEntity } from "@/modules/sisgea/campus/infrastructure/persistence/typeorm/campus.entity";
export { ReservaEntity } from "@/modules/sisgea/reserva/infrastructure/persistence/typeorm/reserva.entity";
export { AulaEntity } from "@/modules/sisgha/aula/infrastructure/persistence/typeorm/aula.entity";
export { CalendarioLetivoEntity } from "@/modules/sisgha/calendario-letivo/infrastructure/persistence/typeorm/calendario-letivo.entity";
export { DiaCalendarioEntity } from "@/modules/sisgha/dia-calendario/infrastructure/persistence/typeorm/dia-calendario.entity";
export { EventoEntity } from "@/modules/sisgha/evento/infrastructure/persistence/typeorm/evento.entity";
export { GradeHorarioOfertaFormacaoEntity } from "@/modules/sisgha/grade-horario-oferta-formacao/infrastructure/persistence/typeorm/grade-horario-oferta-formacao.entity";
export { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "@/modules/sisgha/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure/persistence/typeorm/grade-horario-oferta-formacao-intervalo-de-tempo.entity";
export { HorarioGeradoEntity } from "@/modules/sisgha/horario-gerado/infrastructure/persistence/typeorm/horario-gerado.entity";
export { HorarioGeradoAulaEntity } from "@/modules/sisgha/horario-gerado-aula/infrastructure/persistence/typeorm/horario-gerado-aula.entity";
export { IntervaloDeTempoEntity } from "@/modules/sisgha/intervalo-de-tempo/infrastructure/persistence/typeorm/intervalo-de-tempo.entity";
