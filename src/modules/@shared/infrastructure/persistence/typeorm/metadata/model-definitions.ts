/**
 * Static Model Definitions
 * Replaces TypeSpec-generated model introspection with static definitions
 */

import { commonProperties, defineModel, referenceProperty, simpleProperty } from "./model-registry";

// ============================================================================
// Base/Geographic Entities
// ============================================================================

defineModel("EstadoFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("sigla"),
]);

defineModel("CidadeFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("nome"),
  referenceProperty("estado", "EstadoFindOneQueryResult"),
]);

defineModel("EnderecoFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("cep"),
  simpleProperty("logradouro"),
  simpleProperty("numero"),
  simpleProperty("bairro"),
  simpleProperty("complemento", { nullable: true }),
  simpleProperty("pontoReferencia", { nullable: true }),
  referenceProperty("cidade", "CidadeFindOneQueryResult"),
  ...commonProperties.dated,
]);

// ============================================================================
// Simple Entities (no relations or simple relations)
// ============================================================================

defineModel("ModalidadeFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("slug"),
  ...commonProperties.dated,
]);

defineModel("NivelFormacaoFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("slug"),
  ...commonProperties.dated,
]);

// ============================================================================
// File/Image Entities
// ============================================================================

defineModel("ArquivoFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("name", { nullable: true }),
  simpleProperty("mimeType", { nullable: true }),
  simpleProperty("sizeBytes", { nullable: true }),
  simpleProperty("storageType"),
  ...commonProperties.dated,
]);

defineModel("ImagemArquivoFindOneFromImagemQueryResult", [
  simpleProperty("id"),
  simpleProperty("largura"),
  simpleProperty("altura"),
  simpleProperty("formato"),
  simpleProperty("mimeType"),
  referenceProperty("arquivo", "ArquivoFindOneQueryResult"),
  ...commonProperties.dated,
]);

defineModel("ImagemArquivoFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("largura"),
  simpleProperty("altura"),
  simpleProperty("formato"),
  simpleProperty("mimeType"),
  referenceProperty("imagem", "ImagemFindOneFromImagemArquivoOutput"),
  referenceProperty("arquivo", "ArquivoFindOneQueryResult"),
  ...commonProperties.dated,
]);

defineModel("ImagemFindOneFromImagemArquivoOutput", [
  simpleProperty("id"),
  simpleProperty("descricao", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("ImagemFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("descricao", { nullable: true }),
  // Note: 'versoes' is a OneToMany relation (loaded separately, not via QbEfficientLoad)
  ...commonProperties.dated,
]);

// ============================================================================
// Campus Infrastructure Entities
// ============================================================================

defineModel("CampusFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("nomeFantasia"),
  simpleProperty("razaoSocial"),
  simpleProperty("apelido"),
  simpleProperty("cnpj"),
  referenceProperty("endereco", "EnderecoFindOneQueryResult"),
  ...commonProperties.dated,
]);

defineModel("BlocoFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("codigo"),
  referenceProperty("campus", "CampusFindOneQueryResult"),
  referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("AmbienteFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("descricao", { nullable: true }),
  simpleProperty("codigo"),
  simpleProperty("capacidade", { nullable: true }),
  simpleProperty("tipo", { nullable: true }),
  referenceProperty("bloco", "BlocoFindOneQueryResult"),
  referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("ReservaFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("situacao"),
  simpleProperty("motivo", { nullable: true }),
  simpleProperty("tipo", { nullable: true }),
  simpleProperty("dataInicio"),
  simpleProperty("dataTermino", { nullable: true }),
  simpleProperty("rrule"),
  referenceProperty("ambiente", "AmbienteFindOneQueryResult"),
  referenceProperty("usuario", "UsuarioFindOneQueryResult"),
  ...commonProperties.dated,
]);

// ============================================================================
// User/Authentication Entities
// ============================================================================

defineModel("UsuarioFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("nome", { nullable: true }),
  simpleProperty("matricula", { nullable: true }),
  simpleProperty("email", { nullable: true }),
  simpleProperty("isSuperUser"),
  referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
  referenceProperty("imagemPerfil", "ImagemFindOneQueryResult", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("PerfilFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("ativo"),
  simpleProperty("cargo"),
  referenceProperty("campus", "CampusFindOneQueryResult"),
  referenceProperty("usuario", "UsuarioFindOneQueryResult"),
  ...commonProperties.dated,
]);

// ============================================================================
// Academic Structure Entities
// ============================================================================

defineModel("OfertaFormacaoNivelFormacaoFindOneQueryResult", [
  simpleProperty("id"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneQueryResult"),
  referenceProperty("nivelFormacao", "NivelFormacaoFindOneQueryResult"),
  ...commonProperties.dated,
]);

defineModel("OfertaFormacaoFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("slug"),
  referenceProperty("modalidade", "ModalidadeFindOneQueryResult"),
  ...commonProperties.dated,
]);

defineModel("CursoFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("nomeAbreviado"),
  referenceProperty("campus", "CampusFindOneQueryResult"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneQueryResult"),
  referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("DisciplinaFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("nomeAbreviado"),
  simpleProperty("cargaHoraria"),
  referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
  ...commonProperties.dated,
]);

// ============================================================================
// Calendar Entities
// ============================================================================

defineModel("CalendarioLetivoFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("ano"),
  referenceProperty("campus", "CampusFindOneQueryResult"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneQueryResult"),
  ...commonProperties.dated,
]);

defineModel("DiaCalendarioFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("data"),
  simpleProperty("diaLetivo"),
  simpleProperty("fpiado"),
  referenceProperty("calendario", "CalendarioLetivoFindOneQueryResult"),
  ...commonProperties.dated,
]);

defineModel("EtapaFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("numero"),
  simpleProperty("dataInicio"),
  simpleProperty("dataTermino"),
  simpleProperty("cor", { nullable: true }),
  referenceProperty("calendario", "CalendarioLetivoFindOneQueryResult"),
  ...commonProperties.dated,
]);

defineModel("EventoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("dataInicio"),
  simpleProperty("dataTermino"),
  simpleProperty("cor", { nullable: true }),
  referenceProperty("calendario", "CalendarioLetivoFindOneQueryResult"),
  ...commonProperties.dated,
]);

defineModel("IntervaloDeTempoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("periodoInicio"),
  simpleProperty("periodoFim"),
  ...commonProperties.dated,
]);

defineModel("GradeHorarioOfertaFormacaoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("nome"),
  referenceProperty("campus", "CampusFindOneQueryResult"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneQueryResult"),
  ...commonProperties.dated,
]);

defineModel("GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("periodoInicio"),
  simpleProperty("periodoFim"),
  referenceProperty("gradeHorario", "GradeHorarioOfertaFormacaoFindOneOutputDto"),
  ...commonProperties.dated,
]);

// ============================================================================
// Class/Teaching Entities
// ============================================================================

defineModel("TurmaFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("periodo"),
  referenceProperty("curso", "CursoFindOneQueryResult"),
  referenceProperty("ambientePadraoAula", "AmbienteFindOneQueryResult", { nullable: true }),
  referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("DiarioFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("ativo"),
  referenceProperty("calendarioLetivo", "CalendarioLetivoFindOneQueryResult"),
  referenceProperty("turma", "TurmaFindOneQueryResult"),
  referenceProperty("disciplina", "DisciplinaFindOneQueryResult"),
  referenceProperty("ambientePadrao", "AmbienteFindOneQueryResult", { nullable: true }),
  referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("DiarioProfessorFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("situacao"),
  referenceProperty("perfil", "PerfilFindOneQueryResult"),
  referenceProperty("diario", "DiarioFindOneQueryResult"),
  ...commonProperties.dated,
]);

defineModel("DiarioPreferenciaAgrupamentoFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("aulasSeguidas"),
  simpleProperty("recpirrencia"),
  referenceProperty("diario", "DiarioFindOneQueryResult"),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("AulaFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("data"),
  simpleProperty("modalidade", { nullable: true }),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
  referenceProperty("diario", "DiarioFindOneQueryResult"),
  referenceProperty("ambiente", "AmbienteFindOneQueryResult", { nullable: true }),
  ...commonProperties.dated,
]);

// ============================================================================
// Scheduling/Availability Entities
// ============================================================================

defineModel("DisponibilidadeFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("dataInicio"),
  simpleProperty("dataFim", { nullable: true }),
  referenceProperty("perfil", "PerfilFindOneQueryResult"),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("TurmaDisponibilidadeFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("dataInicio"),
  simpleProperty("dataFim", { nullable: true }),
  referenceProperty("turma", "TurmaFindOneQueryResult"),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("ProfessorIndisponibilidadeFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("dataInicio"),
  simpleProperty("dataFim", { nullable: true }),
  simpleProperty("motivo", { nullable: true }),
  referenceProperty("perfil", "PerfilFindOneQueryResult"),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("HorarioGeradoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("status"),
  simpleProperty("tipo"),
  simpleProperty("data"),
  simpleProperty("vigpienciaInicio"),
  simpleProperty("vigpienciaFim", { nullable: true }),
  referenceProperty("calendarioLetivo", "CalendarioLetivoFindOneQueryResult"),
  ...commonProperties.dated,
]);

defineModel("HorarioGeradoAulaFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("diaSemana"),
  referenceProperty("horarioGerado", "HorarioGeradoFindOneOutputDto"),
  referenceProperty("diario", "DiarioFindOneQueryResult"),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
  referenceProperty("ambiente", "AmbienteFindOneQueryResult", { nullable: true }),
  ...commonProperties.dated,
]);

// ============================================================================
// Export function to ensure all models are loaded
// ============================================================================

/**
 * Initialize all model definitions.
 * Call this at application startup to ensure all models are registered.
 */
export function initializeModelDefinitions(): void {
  // Models are registered when this module is imported
  // This function exists to force the import and provide explicit initialization
}
