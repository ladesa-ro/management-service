/**
 * Static Model Definitions
 * Replaces TypeSpec-generated model introspection with static definitions
 */

import {
  defineModel,
  simpleProperty,
  referenceProperty,
  commonProperties,
} from "./model-registry";

// ============================================================================
// Base/Geographic Entities
// ============================================================================

defineModel("EstadoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("sigla"),
]);

defineModel("CidadeFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("nome"),
  referenceProperty("estado", "EstadoFindOneOutput"),
]);

defineModel("EnderecoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("cep"),
  simpleProperty("logradouro"),
  simpleProperty("numero"),
  simpleProperty("bairro"),
  simpleProperty("complemento", { nullable: true }),
  simpleProperty("pontoReferencia", { nullable: true }),
  referenceProperty("cidade", "CidadeFindOneOutput"),
  ...commonProperties.dated,
]);

// ============================================================================
// Simple Entities (no relations or simple relations)
// ============================================================================

defineModel("ModalidadeFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("slug"),
  ...commonProperties.dated,
]);

defineModel("NivelFormacaoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("slug"),
  ...commonProperties.dated,
]);

// ============================================================================
// File/Image Entities
// ============================================================================

defineModel("ArquivoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("name", { nullable: true }),
  simpleProperty("mimeType", { nullable: true }),
  simpleProperty("sizeBytes", { nullable: true }),
  simpleProperty("storageType"),
  ...commonProperties.dated,
]);

defineModel("ImagemArquivoFindOneFromImagemOutput", [
  simpleProperty("id"),
  simpleProperty("largura"),
  simpleProperty("altura"),
  simpleProperty("formato"),
  simpleProperty("mimeType"),
  referenceProperty("arquivo", "ArquivoFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("ImagemArquivoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("largura"),
  simpleProperty("altura"),
  simpleProperty("formato"),
  simpleProperty("mimeType"),
  referenceProperty("imagem", "ImagemFindOneFromImagemArquivoOutput"),
  referenceProperty("arquivo", "ArquivoFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("ImagemFindOneFromImagemArquivoOutput", [
  simpleProperty("id"),
  simpleProperty("descricao", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("ImagemFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("descricao", { nullable: true }),
  referenceProperty("versoes", "ImagemArquivoFindOneFromImagemOutput"),
  ...commonProperties.dated,
]);

// ============================================================================
// Campus Infrastructure Entities
// ============================================================================

defineModel("CampusFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("nomeFantasia"),
  simpleProperty("razaoSocial"),
  simpleProperty("apelido"),
  simpleProperty("cnpj"),
  referenceProperty("endereco", "EnderecoFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("BlocoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("codigo"),
  referenceProperty("campus", "CampusFindOneOutput"),
  referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("AmbienteFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("descricao", { nullable: true }),
  simpleProperty("codigo"),
  simpleProperty("capacidade", { nullable: true }),
  simpleProperty("tipo", { nullable: true }),
  referenceProperty("bloco", "BlocoFindOneOutput"),
  referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("ReservaFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("situacao"),
  simpleProperty("motivo", { nullable: true }),
  simpleProperty("tipo", { nullable: true }),
  simpleProperty("dataInicio"),
  simpleProperty("dataTermino", { nullable: true }),
  simpleProperty("rrule"),
  referenceProperty("ambiente", "AmbienteFindOneOutput"),
  referenceProperty("usuario", "UsuarioFindOneOutput"),
  ...commonProperties.dated,
]);

// ============================================================================
// User/Authentication Entities
// ============================================================================

defineModel("UsuarioFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("nome", { nullable: true }),
  simpleProperty("matriculaSiape", { nullable: true }),
  simpleProperty("email", { nullable: true }),
  simpleProperty("isSuperUser"),
  referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
  referenceProperty("imagemPerfil", "ImagemFindOneOutput", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("PerfilFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("ativo"),
  simpleProperty("cargo"),
  referenceProperty("campus", "CampusFindOneOutput"),
  referenceProperty("usuario", "UsuarioFindOneOutput"),
  ...commonProperties.dated,
]);

// ============================================================================
// Academic Structure Entities
// ============================================================================

defineModel("OfertaFormacaoNivelFormacaoFindOneOutput", [
  simpleProperty("id"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutput"),
  referenceProperty("nivelFormacao", "NivelFormacaoFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("OfertaFormacaoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("slug"),
  referenceProperty("modalidade", "ModalidadeFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("CursoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("nomeAbreviado"),
  referenceProperty("campus", "CampusFindOneOutput"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutput"),
  referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("DisciplinaFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("nomeAbreviado"),
  simpleProperty("cargaHoraria"),
  referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
  ...commonProperties.dated,
]);

// ============================================================================
// Calendar Entities
// ============================================================================

defineModel("CalendarioLetivoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("ano"),
  referenceProperty("campus", "CampusFindOneOutput"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("DiaCalendarioFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("data"),
  simpleProperty("diaLetivo"),
  simpleProperty("fpiado"),
  referenceProperty("calendario", "CalendarioLetivoFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("EtapaFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("numero"),
  simpleProperty("dataInicio"),
  simpleProperty("dataTermino"),
  simpleProperty("cor", { nullable: true }),
  referenceProperty("calendario", "CalendarioLetivoFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("EventoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("nome"),
  simpleProperty("dataInicio"),
  simpleProperty("dataTermino"),
  simpleProperty("cor", { nullable: true }),
  referenceProperty("calendario", "CalendarioLetivoFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("IntervaloDeTempoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("periodoInicio"),
  simpleProperty("periodoFim"),
  ...commonProperties.dated,
]);

defineModel("GradeHorarioOfertaFormacaoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("nome"),
  referenceProperty("campus", "CampusFindOneOutput"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("periodoInicio"),
  simpleProperty("periodoFim"),
  referenceProperty("gradeHorario", "GradeHorarioOfertaFormacaoFindOneOutput"),
  ...commonProperties.dated,
]);

// ============================================================================
// Class/Teaching Entities
// ============================================================================

defineModel("TurmaFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("periodo"),
  referenceProperty("curso", "CursoFindOneOutput"),
  referenceProperty("ambientePadraoAula", "AmbienteFindOneOutput", { nullable: true }),
  referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("DiarioFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("ativo"),
  referenceProperty("calendarioLetivo", "CalendarioLetivoFindOneOutput"),
  referenceProperty("turma", "TurmaFindOneOutput"),
  referenceProperty("disciplina", "DisciplinaFindOneOutput"),
  referenceProperty("ambientePadrao", "AmbienteFindOneOutput", { nullable: true }),
  referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("DiarioProfessorFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("situacao"),
  referenceProperty("perfil", "PerfilFindOneOutput"),
  referenceProperty("diario", "DiarioFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("DiarioPreferenciaAgrupamentoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("aulasSeguidas"),
  simpleProperty("recpirrencia"),
  referenceProperty("diario", "DiarioFindOneOutput"),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("AulaFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("data"),
  simpleProperty("modalidade", { nullable: true }),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutput"),
  referenceProperty("diario", "DiarioFindOneOutput"),
  referenceProperty("ambiente", "AmbienteFindOneOutput", { nullable: true }),
  ...commonProperties.dated,
]);

// ============================================================================
// Scheduling/Availability Entities
// ============================================================================

defineModel("DisponibilidadeFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("dataInicio"),
  simpleProperty("dataFim", { nullable: true }),
  referenceProperty("perfil", "PerfilFindOneOutput"),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("TurmaDisponibilidadeFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("dataInicio"),
  simpleProperty("dataFim", { nullable: true }),
  referenceProperty("turma", "TurmaFindOneOutput"),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("ProfessorIndisponibilidadeFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("dataInicio"),
  simpleProperty("dataFim", { nullable: true }),
  simpleProperty("motivo", { nullable: true }),
  referenceProperty("perfil", "PerfilFindOneOutput"),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutput", { nullable: true }),
  ...commonProperties.dated,
]);

defineModel("HorarioGeradoFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("status"),
  simpleProperty("tipo"),
  simpleProperty("data"),
  simpleProperty("vigpienciaInicio"),
  simpleProperty("vigpienciaFim", { nullable: true }),
  referenceProperty("calendarioLetivo", "CalendarioLetivoFindOneOutput"),
  ...commonProperties.dated,
]);

defineModel("HorarioGeradoAulaFindOneOutput", [
  simpleProperty("id"),
  simpleProperty("diaSemana"),
  referenceProperty("horarioGerado", "HorarioGeradoFindOneOutput"),
  referenceProperty("diario", "DiarioFindOneOutput"),
  referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutput"),
  referenceProperty("ambiente", "AmbienteFindOneOutput", { nullable: true }),
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
