/**
 * Static Model Definitions
 * Replaces TypeSpec-generated model introspection with static definitions
 */

import { commonProperties, defineModel, referenceProperty, simpleProperty } from "./model-registry";

// ============================================================================
// Base/Geographic Entities
// ============================================================================

defineModel("EstadoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("sigla"),
]);

defineModel("CidadeFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("nome"),
  referenceProperty("estado", "EstadoFindOneOutputDto"),
]);

defineModel("EnderecoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("cep"),
  simpleProperty("logradouro"),
  simpleProperty("numero"),
  simpleProperty("bairro"),
  simpleProperty("complemento", { nullable: true }),
  simpleProperty("pontoReferencia", { nullable: true }),
  referenceProperty("cidade", "CidadeFindOneOutputDto"),
  ...commonProperties.dated,
]);

// ============================================================================
// Simple Entities (no relations or simple relations)
// ============================================================================

defineModel("ModalidadeFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("slug"),
  ...commonProperties.dated,
]);

defineModel("NivelFormacaoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("slug"),
  ...commonProperties.dated,
]);

// ============================================================================
// File/Image Entities
// ============================================================================

defineModel("ArquivoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("name", { nullable: true }),
  simpleProperty("mimeType", { nullable: true }),
  simpleProperty("sizeBytes", { nullable: true }),
  simpleProperty("storageType"),
  ...commonProperties.dated,
]);

defineModel("ImagemArquivoFindOneFromImagemOutputDto", [
  simpleProperty("id"),
  simpleProperty("largura"),
  simpleProperty("altura"),
  simpleProperty("formato"),
  simpleProperty("mimeType"),
  referenceProperty("arquivo", "ArquivoFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("ImagemArquivoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("largura"),
  simpleProperty("altura"),
  simpleProperty("formato"),
  simpleProperty("mimeType"),
  referenceProperty("imagem", "ImagemFindOneFromImagemArquivoOutput"),
  referenceProperty("arquivo", "ArquivoFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("ImagemFindOneFromImagemArquivoOutput", [
  simpleProperty("id"),
  simpleProperty("descricao", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("ImagemFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("descricao", { nullable: true }),
  // Note: 'versoes' is a OneToMany relation (loaded separately, not via QbEfficientLoad)
  ...commonProperties.dated,
]);

// ============================================================================
// Campus Infrastructure Entities
// ============================================================================

defineModel("CampusFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("nomeFantasia"),
  simpleProperty("razaoSocial"),
  simpleProperty("apelido"),
  simpleProperty("cnpj"),
  referenceProperty("endereco", "EnderecoFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("BlocoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("codigo"),
  referenceProperty("campus", "CampusFindOneOutputDto"),
  referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("AmbienteFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("descricao", { nullable: true }),
  simpleProperty("codigo"),
  simpleProperty("capacidade", { nullable: true }),
  simpleProperty("tipo", { nullable: true }),
  referenceProperty("bloco", "BlocoFindOneOutputDto"),
  referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
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
  referenceProperty("ambiente", "AmbienteFindOneOutputDto"),
  referenceProperty("usuario", "UsuarioFindOneOutputDto"),
  ...commonProperties.dated,
]);

// ============================================================================
// User/Authentication Entities
// ============================================================================

defineModel("UsuarioFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("nome", { nullable: true }),
  simpleProperty("matriculaSiape", { nullable: true }),
  simpleProperty("email", { nullable: true }),
  simpleProperty("isSuperUser"),
  referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
  referenceProperty("imagemPerfil", "ImagemFindOneOutputDto", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("PerfilFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("ativo"),
  simpleProperty("cargo"),
  referenceProperty("campus", "CampusFindOneOutputDto"),
  referenceProperty("usuario", "UsuarioFindOneOutputDto"),
  ...commonProperties.dated,
]);

// ============================================================================
// Academic Structure Entities
// ============================================================================

defineModel("OfertaFormacaoNivelFormacaoFindOneOutputDto", [
  simpleProperty("id"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutputDto"),
  referenceProperty("nivelFormacao", "NivelFormacaoFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("OfertaFormacaoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("slug"),
  referenceProperty("modalidade", "ModalidadeFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("CursoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("nomeAbreviado"),
  referenceProperty("campus", "CampusFindOneOutputDto"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutputDto"),
  referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("DisciplinaFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("nomeAbreviado"),
  simpleProperty("cargaHoraria"),
  referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
  ...commonProperties.dated,
]);

// ============================================================================
// Calendar Entities
// ============================================================================

defineModel("CalendarioLetivoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("ano"),
  referenceProperty("campus", "CampusFindOneOutputDto"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("DiaCalendarioFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("data"),
  simpleProperty("diaLetivo"),
  simpleProperty("fpiado"),
  referenceProperty("calendario", "CalendarioLetivoFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("EtapaFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("numero"),
  simpleProperty("dataInicio"),
  simpleProperty("dataTermino"),
  simpleProperty("cor", { nullable: true }),
  referenceProperty("calendario", "CalendarioLetivoFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("EventoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("dataInicio"),
  simpleProperty("dataTermino"),
  simpleProperty("cor", { nullable: true }),
  referenceProperty("calendario", "CalendarioLetivoFindOneOutputDto"),
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
  referenceProperty("campus", "CampusFindOneOutputDto"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutputDto"),
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

defineModel("TurmaFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("periodo"),
  referenceProperty("curso", "CursoFindOneOutputDto"),
  referenceProperty("ambientePadraoAula", "AmbienteFindOneOutputDto", { nullable: true }),
  referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("DiarioFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("ativo"),
  referenceProperty("calendarioLetivo", "CalendarioLetivoFindOneOutputDto"),
  referenceProperty("turma", "TurmaFindOneOutputDto"),
  referenceProperty("disciplina", "DisciplinaFindOneOutputDto"),
  referenceProperty("ambientePadrao", "AmbienteFindOneOutputDto", { nullable: true }),
  referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("DiarioProfessorFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("situacao"),
  referenceProperty("perfil", "PerfilFindOneOutputDto"),
  referenceProperty("diario", "DiarioFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("DiarioPreferenciaAgrupamentoFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("aulasSeguidas"),
  simpleProperty("recpirrencia"),
  referenceProperty("diario", "DiarioFindOneOutputDto"),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("AulaFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("data"),
  simpleProperty("modalidade", { nullable: true }),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
  referenceProperty("diario", "DiarioFindOneOutputDto"),
  referenceProperty("ambiente", "AmbienteFindOneOutputDto", { nullable: true }),
  ...commonProperties.dated,
]);

// ============================================================================
// Scheduling/Availability Entities
// ============================================================================

defineModel("DisponibilidadeFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("dataInicio"),
  simpleProperty("dataFim", { nullable: true }),
  referenceProperty("perfil", "PerfilFindOneOutputDto"),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("TurmaDisponibilidadeFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("dataInicio"),
  simpleProperty("dataFim", { nullable: true }),
  referenceProperty("turma", "TurmaFindOneOutputDto"),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("ProfessorIndisponibilidadeFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("dataInicio"),
  simpleProperty("dataFim", { nullable: true }),
  simpleProperty("motivo", { nullable: true }),
  referenceProperty("perfil", "PerfilFindOneOutputDto"),
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
  referenceProperty("calendarioLetivo", "CalendarioLetivoFindOneOutputDto"),
  ...commonProperties.dated,
]);

defineModel("HorarioGeradoAulaFindOneOutputDto", [
  simpleProperty("id"),
  simpleProperty("diaSemana"),
  referenceProperty("horarioGerado", "HorarioGeradoFindOneOutputDto"),
  referenceProperty("diario", "DiarioFindOneOutputDto"),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
  referenceProperty("ambiente", "AmbienteFindOneOutputDto", { nullable: true }),
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
