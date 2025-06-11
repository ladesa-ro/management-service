import "@typespec/json-schema";

import "./generics/index.tsp";

import "./resources/arquivo.model.tsp";
import "./resources/arquivo.dtos.tsp";
import "./resources/imagem.model.tsp";
import "./resources/imagem.dtos.tsp";
import "./resources/imagem-arquivo.model.tsp";
import "./resources/imagem-arquivo.dtos.tsp";
import "./resources/intervalo-de-tempo.model.tsp";
import "./resources/intervalo-de-tempo.dtos.tsp";

import "./resources/cidade.model.tsp";
import "./resources/cidade.dtos.tsp";
import "./resources/estado.model.tsp";
import "./resources/estado.dtos.tsp";
import "./resources/endereco.model.tsp";
import "./resources/endereco.dtos.tsp";

import "./resources/usuario.model.tsp";
import "./resources/usuario.dtos.tsp";
import "./resources/autenticacao.model.tsp";
import "./resources/autenticacao.dtos.tsp";

import "./resources/campus.model.tsp";
import "./resources/campus.dtos.tsp";
import "./resources/bloco.model.tsp";
import "./resources/bloco.dtos.tsp";
import "./resources/ambiente.model.tsp";
import "./resources/ambiente.dtos.tsp";
import "./resources/reserva.model.tsp";
import "./resources/reserva.dtos.tsp";

import "./resources/perfil.model.tsp";
import "./resources/perfil.dtos.tsp";

import "./resources/nivel-de-formacao.model.tsp";
import "./resources/nivel-de-formacao.dtos.tsp";
import "./resources/modalidade.model.tsp";
import "./resources/modalidade.dtos.tsp";
import "./resources/oferta-formacao.model.tsp";
import "./resources/oferta-formacao.dtos.tsp";
import "./resources/oferta-formacao-nivel-formacao.model.tsp";
import "./resources/oferta-formacao-nivel-formacao.dtos.tsp";
import "./resources/curso.model.tsp";
import "./resources/curso.dtos.tsp";
import "./resources/disciplina.model.tsp";
import "./resources/disciplina.dtos.tsp";

import "./resources/etapa.dtos.tsp";
import "./resources/grade-horario-oferta-formacao-intervalo-de-tempo.dtos.tsp";
import "./resources/evento.dtos.tsp";
import "./resources/evento.model.tsp";
import "./resources/grade-horario-oferta-formacao.dtos.tsp";
import "./resources/dia-calendario.model.tsp";
import "./resources/dia-calendario.dtos.tsp";
import "./resources/calendario-dias.dtos.tsp";
import "./resources/grade-horario-oferta-formacao.model.tsp";
import "./resources/grade-horario-oferta-formacao-intervalo-de-tempo.model.tsp";
import "./resources/calendario-dias.model.tsp";
import "./resources/calendario-letivo.dtos.tsp";
import "./resources/calendario-letivo.model.tsp";
import "./resources/etapa.model.tsp";

import "./resources/turma.model.tsp";
import "./resources/turma.dtos.tsp";
import "./resources/diario.model.tsp";
import "./resources/diario.dtos.tsp";
import "./resources/diario-professor.model.tsp";
import "./resources/diario-professor.dtos.tsp";
import "./resources/aula.model.tsp";
import "./resources/aula.dtos.tsp";

import "./resources/disponibilidade.model.tsp";
import "./resources/disponibilidade.dtos.tsp";
import "./resources/disponibilidade-dia.model.tsp";
import "./resources/disponibilidade-dia.dtos.tsp";
import "./resources/turma-disponibilidade.model.tsp";
import "./resources/turma-disponibilidade.dtos.tsp";
import "./resources/professor-disponibilidade.model.tsp";
import "./resources/professor-disponibilidade.dtos.tsp";
import "./resources/diario-preferencia-agrupamento.model.tsp";
import "./resources/diario-preferencia-agrupamento.dtos.tsp";
import "./resources/horario-gerado.model.tsp";
import "./resources/horario-gerado.dtos.tsp";
import "./resources/horario-gerado-aula.model.tsp";
import "./resources/horario-gerado-aula.dtos.tsp";

import "./resources/gerar-horario.dtos.tsp";

using TypeSpec.JsonSchema;

@jsonSchema
@baseUri("ladesa://domain/v4/")
namespace Ladesa.ManagementService.Domain.Contracts;
