import "@typespec/http";
import "@typespec/json-schema";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;
using JsonSchema;

/**
 * API para a consulta e manipulação de dados e procedimentos relacionados ao Sistema de Gestão Acadêmico.
 */
@service(#{ title: "Ladesa - API" })
@info(#{ version: "0.0", contact: #{} })
namespace LadesaAPI;

model PaginatedResultMetaView {
  /**
   * Quantidade de itens por página.
   */
  itemsPerPage: integer;

  /**
   * Total de itens.
   */
  totalItems: integer;

  /**
   * Página atual.
   */
  currentPage: integer;

  /**
   * Quantidade total de páginas.
   */
  totalPages: integer;

  /**
   * Termo textual da busca.
   */
  search: string;

  /**
   * Ordenação.
   */
  sortBy: {
    @pattern("^[\\\\D\\\\.]+$")
    property: string;

    @pattern("^(ASC|DESC)$")
    mode: string;
  }[];

  /**
   * Filtros.
   */
  filter: {
    property: string;
    restrictions: string[];
  }[];
}

model EstadoFindOneResultView {
  /**
   * Identificador do registro (numérico).
   */
  @minValue(1) id: integer;

  /**
   * Nome oficial do estado.
   */
  nome: string;

  /**
   * Sigla do estado.
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-estado-sigla", true) sigla: string;
}

model PaginatedResultLinksView {
  first: string | null;
  previous: string | null;
  current: string | null;
  next: string | null;
  last: string | null;
}

model EstadoListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um estado.
   */
  data: EstadoFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model CidadeFindOneResultView {
  /**
   * Identificador do registro (numérico).
   */
  @minValue(1) id: integer;

  /**
   * Nome oficial da cidade.
   */
  nome: string;

  /**
   * Visão FindOne de um estado.
   */
  estado: EstadoFindOneResultView;
}

model CidadeListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de uma cidade.
   */
  data: CidadeFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model ArquivoFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Nome do arquivo.
   */
  name: string | null;

  /**
   * Formato do arquivo.
   */
  mimeType: string | null;

  /**
   * Tamanho do arquivo (em bytes).
   */
  sizeBytes: integer | null;

  /**
   * Estratégia de armazenamento do conteúdo.
   */
  storageType: string;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model ImagemArquivoFindOneFromImagemResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Largura da imagem.
   */
  largura: integer;

  /**
   * Altura da imagem.
   */
  altura: integer;

  /**
   * Formato da imagem.
   */
  formato: string;

  /**
   * Mime-type da imagem.
   */
  mimeType: string;

  /**
   * Dados de saída para encontrar um arquivo por id.
   */
  arquivo: ArquivoFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model ImagemFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Descrição da imagem.
   */
  descricao: string | null;

  /**
   * Visão FindOneFromImagem de uma versão de imagem.
   */
  versoes: ImagemArquivoFindOneFromImagemResultView[];

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model UsuarioFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Nome do usuário.
   */
  @minLength(1) nome: string | null;

  /**
   * Matrícula SIAPE do usuário.
   */
  @minLength(1) matriculaSiape: string | null;

  /**
   * E-mail do usuário.
   */
  @format("email") email: string | null;

  /**
   * Diz que o usuário tem poderes de administrador.
   */
  isSuperUser: boolean;

  /**
   * Visão FindOne de uma imagem.
   */
  imagemCapa: ImagemFindOneResultView | null;

  /**
   * Visão FindOne de uma imagem.
   */
  imagemPerfil: ImagemFindOneResultView | null;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model EnderecoFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Código postal (CEP).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-cep", true) cep: string;

  /**
   * Logradouro.
   */
  logradouro: string;

  /**
   * Número.
   */
  @minValue(0) @maxValue(99999) numero: integer;

  /**
   * Bairro.
   */
  bairro: string;

  /**
   * Complemento.
   */
  complemento: string | null;

  /**
   * Ponto de referência.
   */
  pontoReferencia: string | null;

  /**
   * Visão FindOne de uma cidade.
   */
  cidade: CidadeFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model CampusFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Nome fantasia do campus.
   */
  @minLength(1) nomeFantasia: string;

  /**
   * Razão social do campus.
   */
  @minLength(1) razaoSocial: string;

  /**
   * Apelido do campus.
   */
  @minLength(1) apelido: string;

  /**
   * CNPJ do campus.
   */
  @minLength(1) cnpj: string;

  /**
   * Visão FindOne de um endereço.
   */
  endereco: EnderecoFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model PerfilFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Indica se o vínculo está ativo.
   */
  ativo: boolean;

  /**
   * Cargo do usuário no vínculo.
   */
  cargo: string;

  /**
   * Visão FindOne de um campus.
   */
  campus: CampusFindOneResultView;

  /**
   * Visão FindOne de um Usuário.
   */
  usuario: UsuarioFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model AuthWhoAmIInputView {
  /**
   * Usuário autenticado.
   */
  usuario: UsuarioFindOneResultView | null;

  /**
   * Visão FindOne de um Vínculo.
   */
  perfisAtivos: PerfilFindOneResultView[];
}

model AuthLoginInputView {
  /**
   * Matrícula SIAPE.
   */
  matriculaSiape: string;

  /**
   * Senha do usuário.
   */
  senha: string;
}

model AuthSessionCredentialsView {
  /**
   * Token de acesso.
   */
  access_token: string | null;

  /**
   * Tipo do token.
   */
  token_type: string | null;

  /**
   * Token de identificação.
   */
  id_token: string | null;

  /**
   * Token de refresh.
   */
  refresh_token: string | null;

  /**
   * Tempo de expiração do token.
   */
  expires_in: integer | null;

  /**
   * Tempo de expiração do token.
   */
  expires_at: integer | null;

  /**
   * Estado da sessão.
   */
  session_state: string | null;

  /**
   * Escopo da autenticação.
   */
  scope: string | null;
}

model AuthRefreshInputView {
  /**
   * Token de refresh.
   */
  refreshToken: string;
}

model AuthSetInitialPasswordInputView {
  /**
   * Matrícula SIAPE.
   */
  matriculaSiape: string;

  /**
   * Nova senha.
   */
  senha: string;
}

model AuthRecoverPasswordInputView {
  /**
   * E-mail.
   */
  email: string;
}

model UsuarioListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um Usuário.
   */
  data: UsuarioFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model UsuarioInputCreateView {
  /**
   * Nome do usuário.
   */
  @minLength(1) nome: string | null;

  /**
   * Matrícula SIAPE do usuário.
   */
  @minLength(1) matriculaSiape: string | null;

  /**
   * E-mail do usuário.
   */
  @format("email") email: string | null;
}

model UsuarioInputUpdateView {
  /**
   * Nome do usuário.
   */
  @minLength(1) nome?: string | null;

  /**
   * Matrícula SIAPE do usuário.
   */
  @minLength(1) matriculaSiape?: string | null;

  /**
   * E-mail do usuário.
   */
  @format("email") email?: string | null;
}

model PerfilListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um Vínculo.
   */
  data: PerfilFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model CampusFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Campus") @format("uuid") id: string;
}

model UsuarioFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Usuario") @format("uuid") id: string;
}

model PerfilInputUpdateView {
  /**
   * Cargos do usuário no vínculo.
   */
  cargos: string[];

  /**
   * Dados de entrada para encontrar um campus por id.
   */
  campus: CampusFindOneInputView;

  /**
   * Dados de entrada para encontrar um Usuário por ID.
   */
  usuario: UsuarioFindOneInputView;
}

model CampusListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um campus.
   */
  data: CampusFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model CidadeFindOneInputView {
  /**
   * Identificador do registro (numérico).
   */
  @minValue(1) id: integer;
}

model EnderecoInputView {
  /**
   * Código postal (CEP).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-cep", true) cep: string;

  /**
   * Logradouro.
   */
  logradouro: string;

  /**
   * Número.
   */
  @minValue(0) @maxValue(99999) numero: integer;

  /**
   * Bairro.
   */
  bairro: string;

  /**
   * Complemento.
   */
  complemento: string | null;

  /**
   * Ponto de referência.
   */
  pontoReferencia: string | null;

  /**
   * Dados de entrada para encontrar uma cidade por id.
   */
  cidade: CidadeFindOneInputView;
}

model CampusInputCreateView {
  /**
   * Nome fantasia do campus.
   */
  @minLength(1) nomeFantasia: string;

  /**
   * Razão social do campus.
   */
  @minLength(1) razaoSocial: string;

  /**
   * Apelido do campus.
   */
  @minLength(1) apelido: string;

  /**
   * CNPJ do campus.
   */
  @minLength(1) cnpj: string;

  /**
   * Dados de entrada para um endereco.
   */
  endereco: EnderecoInputView;
}

model CampusInputUpdateView {
  /**
   * Nome fantasia do campus.
   */
  @minLength(1) nomeFantasia?: string;

  /**
   * Razão social do campus.
   */
  @minLength(1) razaoSocial?: string;

  /**
   * Apelido do campus.
   */
  @minLength(1) apelido?: string;

  /**
   * CNPJ do campus.
   */
  @minLength(1) cnpj?: string;

  /**
   * Dados de entrada para um endereco.
   */
  endereco?: EnderecoInputView;
}

model BlocoFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Nome do Bloco.
   */
  @minLength(1) nome: string;

  /**
   * Código do Bloco.
   */
  @minLength(1) codigo: string;

  /**
   * Visão FindOne de um campus.
   */
  campus: CampusFindOneResultView;

  /**
   * Visão FindOne de uma imagem.
   */
  imagemCapa: ImagemFindOneResultView | null;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model BlocoListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um bloco.
   */
  data: BlocoFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model BlocoInputCreateView {
  /**
   * Nome do Bloco.
   */
  @minLength(1) nome: string;

  /**
   * Código do Bloco.
   */
  @minLength(1) codigo: string;

  /**
   * Dados de entrada para encontrar um campus por id.
   */
  campus: CampusFindOneInputView;
}

model BlocoInputUpdateView {
  /**
   * Nome do Bloco.
   */
  @minLength(1) nome?: string;

  /**
   * Código do Bloco.
   */
  @minLength(1) codigo?: string;

  /**
   * Dados de entrada para encontrar um campus por id.
   */
  campus?: CampusFindOneInputView;
}

model AmbienteFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Nome do ambiente/sala.
   */
  @minLength(1) nome: string;

  /**
   * Descrição do ambiente/sala.
   */
  descricao: string | null;

  /**
   * Código do ambiente/sala.
   */
  @minLength(1) codigo: string;

  /**
   * Capacidade do ambiente/sala.
   */
  capacidade: integer | null;

  /**
   * Tipo do ambiente/sala. Ex.: sala aula, auditório, laboratório de química.
   */
  tipo: string | null;

  /**
   * Visão FindOne de um bloco.
   */
  bloco: BlocoFindOneResultView;

  /**
   * Visão FindOne de uma imagem.
   */
  imagemCapa: ImagemFindOneResultView | null;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model AmbienteListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um ambiente.
   */
  data: AmbienteFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model BlocoFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Bloco") @format("uuid") id: string;
}

model AmbienteInputCreateView {
  /**
   * Nome do ambiente/sala.
   */
  @minLength(1) nome: string;

  /**
   * Descrição do ambiente/sala.
   */
  descricao: string | null;

  /**
   * Código do ambiente/sala.
   */
  @minLength(1) codigo: string;

  /**
   * Capacidade do ambiente/sala.
   */
  capacidade: integer | null;

  /**
   * Tipo do ambiente/sala. Ex.: sala aula, auditório, laboratório de química.
   */
  tipo: string | null;

  /**
   * Dados de entrada para encontrar um bloco por id.
   */
  bloco: BlocoFindOneInputView;
}

model AmbienteInputUpdateView {
  /**
   * Nome do ambiente/sala.
   */
  @minLength(1) nome?: string;

  /**
   * Descrição do ambiente/sala.
   */
  descricao?: string | null;

  /**
   * Código do ambiente/sala.
   */
  @minLength(1) codigo?: string;

  /**
   * Capacidade do ambiente/sala.
   */
  capacidade?: integer | null;

  /**
   * Tipo do ambiente/sala. Ex.: sala aula, auditório, laboratório de química.
   */
  tipo?: string | null;

  /**
   * Dados de entrada para encontrar um bloco por id.
   */
  bloco?: BlocoFindOneInputView;
}

model ReservaFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Situação da reserva.
   */
  @minLength(1) situacao: string;

  /**
   * Motivo da reserva.
   */
  @minLength(1) motivo: string | null;

  /**
   * Tipo da reserva.
   */
  @minLength(1) tipo: string | null;

  /**
   * Regra RRule para a recorrência da reserva. Segue a RFC 5545 do iCalendar.
   */
  rrule: string;

  /**
   * Visão FindOne de um Usuário.
   */
  usuario: UsuarioFindOneResultView;

  /**
   * Visão FindOne de um ambiente.
   */
  ambiente: AmbienteFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model ReservaListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de uma Reserva.
   */
  data: ReservaFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model AmbienteFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Ambiente") @format("uuid") id: string;
}

model ReservaInputCreateView {
  /**
   * Situação da reserva.
   */
  @minLength(1) situacao: string;

  /**
   * Motivo da reserva.
   */
  @minLength(1) motivo: string | null;

  /**
   * Tipo da reserva.
   */
  @minLength(1) tipo: string | null;

  /**
   * Regra RRule para a recorrência da reserva. Segue a RFC 5545 do iCalendar.
   */
  rrule: string;

  /**
   * Dados de entrada para encontrar um Usuário por ID.
   */
  usuario: UsuarioFindOneInputView;

  /**
   * Dados de entrada para encontrar um ambiente por id.
   */
  ambiente: AmbienteFindOneInputView;
}

model ReservaInputUpdateView {
  /**
   * Situação da reserva.
   */
  @minLength(1) situacao?: string;

  /**
   * Motivo da reserva.
   */
  @minLength(1) motivo?: string | null;

  /**
   * Tipo da reserva.
   */
  @minLength(1) tipo?: string | null;

  /**
   * Regra RRule para a recorrência da reserva. Segue a RFC 5545 do iCalendar.
   */
  rrule?: string;

  /**
   * Dados de entrada para encontrar um Usuário por ID.
   */
  usuario?: UsuarioFindOneInputView;

  /**
   * Dados de entrada para encontrar um ambiente por id.
   */
  ambiente?: AmbienteFindOneInputView;
}

model NivelFormacaoFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Apelido do nível de formação.
   */
  @minLength(1) slug: string;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model NivelFormacaoListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um nível de formação.
   */
  data: NivelFormacaoFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model NivelFormacaoInputCreateView {
  /**
   * Apelido do nível de formação.
   */
  @minLength(1) slug: string;
}

model NivelFormacaoInputUpdateView {
  /**
   * Apelido do nível de formação.
   */
  @minLength(1) slug?: string;
}

model ModalidadeFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Apelido da modalidade.
   */
  @minLength(1) slug: string;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model ModalidadeListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de uma modalidade.
   */
  data: ModalidadeFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model ModalidadeInputCreateView {
  /**
   * Apelido da modalidade.
   */
  @minLength(1) slug: string;
}

model ModalidadeInputUpdateView {
  /**
   * Apelido da modalidade.
   */
  @minLength(1) slug?: string;
}

model OfertaFormacaoFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Nome da oferta de formação.
   */
  @minLength(1) nome: string;

  /**
   * Apelido da oferta de formação.
   */
  @minLength(1) slug: string;

  /**
   * Modalidade da oferta de formação.
   */
  modalidade: ModalidadeFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model OfertaFormacaoListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de uma oferta de formação.
   */
  data: OfertaFormacaoFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model ModalidadeFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Modalidade") @format("uuid") id: string;
}

model OfertaFormacaoInputCreateView {
  /**
   * Nome da oferta de formação.
   */
  @minLength(1) nome: string;

  /**
   * Apelido da oferta de formação.
   */
  @minLength(1) slug: string;

  /**
   * Modalidade da oferta de formação.
   */
  modalidade: ModalidadeFindOneInputView;
}

model OfertaFormacaoInputUpdateView {
  /**
   * Nome da oferta de formação.
   */
  @minLength(1) nome?: string;

  /**
   * Apelido da oferta de formação.
   */
  @minLength(1) slug?: string;

  /**
   * Modalidade da oferta de formação.
   */
  modalidade?: ModalidadeFindOneInputView;
}

model OfertaFormacaoNivelFormacaoFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Visão FindOne de uma oferta de formação.
   */
  ofertaFormacao: OfertaFormacaoFindOneResultView;

  /**
   * Visão FindOne de um nível de formação.
   */
  nivelFormacao: NivelFormacaoFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model OfertaFormacaoNivelFormacaoListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de uma oferta de formação.
   */
  data: OfertaFormacaoNivelFormacaoFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model OfertaFormacaoFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "OfertaFormacao") @format("uuid") id: string;
}

model NivelFormacaoFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "NivelFormacao") @format("uuid") id: string;
}

model OfertaFormacaoNivelFormacaoInputCreateView {
  /**
   * Dados de entrada para encontrar uma oferta de formação por ID.
   */
  ofertaFormacao: OfertaFormacaoFindOneInputView;

  /**
   * Dados de entrada para encontrar um nível de formação por ID.
   */
  nivelFormacao: NivelFormacaoFindOneInputView;
}

model OfertaFormacaoNivelFormacaoInputUpdateView {
  /**
   * Dados de entrada para encontrar uma oferta de formação por ID.
   */
  ofertaFormacao?: OfertaFormacaoFindOneInputView;

  /**
   * Dados de entrada para encontrar um nível de formação por ID.
   */
  nivelFormacao?: NivelFormacaoFindOneInputView;
}

model CursoFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Nome do curso.
   */
  @minLength(1) nome: string;

  /**
   * Nome abreviado do curso.
   */
  @minLength(1) nomeAbreviado: string;

  /**
   * Visão FindOne de um campus.
   */
  campus: CampusFindOneResultView;

  /**
   * Visão FindOne de uma oferta de formação.
   */
  ofertaFormacao: OfertaFormacaoFindOneResultView;

  /**
   * Visão FindOne de uma imagem.
   */
  imagemCapa: ImagemFindOneResultView | null;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model CursoListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um Curso.
   */
  data: CursoFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model CursoInputCreateView {
  /**
   * Nome do curso.
   */
  @minLength(1) nome: string;

  /**
   * Nome abreviado do curso.
   */
  @minLength(1) nomeAbreviado: string;

  /**
   * Dados de entrada para encontrar um campus por id.
   */
  campus: CampusFindOneInputView;

  /**
   * Dados de entrada para encontrar uma oferta de formação por ID.
   */
  ofertaFormacao: OfertaFormacaoFindOneInputView;
}

model CursoInputUpdateView {
  /**
   * Nome do curso.
   */
  @minLength(1) nome?: string;

  /**
   * Nome abreviado do curso.
   */
  @minLength(1) nomeAbreviado?: string;

  /**
   * Dados de entrada para encontrar um campus por id.
   */
  campus?: CampusFindOneInputView;

  /**
   * Dados de entrada para encontrar uma oferta de formação por ID.
   */
  ofertaFormacao?: OfertaFormacaoFindOneInputView;
}

model DisciplinaFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Nome da disciplina.
   */
  @minLength(1) nome: string;

  /**
   * Nome abreviado da disciplina.
   */
  @minLength(1) nomeAbreviado: string;

  /**
   * Carga horária da disciplina.
   */
  @minValue(1) @maxValue(65535) cargaHoraria: integer;

  /**
   * Visão FindOne de uma imagem.
   */
  imagemCapa: ImagemFindOneResultView | null;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model DisciplinaListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de uma Disciplina.
   */
  data: DisciplinaFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model DisciplinaInputCreateView {
  /**
   * Nome da disciplina.
   */
  @minLength(1) nome: string;

  /**
   * Nome abreviado da disciplina.
   */
  @minLength(1) nomeAbreviado: string;

  /**
   * Carga horária da disciplina.
   */
  @minValue(1) @maxValue(65535) cargaHoraria: integer;
}

model DisciplinaInputUpdateView {
  /**
   * Nome da disciplina.
   */
  @minLength(1) nome?: string;

  /**
   * Nome abreviado da disciplina.
   */
  @minLength(1) nomeAbreviado?: string;

  /**
   * Carga horária da disciplina.
   */
  @minValue(1) @maxValue(65535) cargaHoraria?: integer;
}

model CalendarioLetivoFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Nome do calendário letivo.
   */
  nome: string;

  /**
   * Ano do calendário letivo.
   */
  @minValue(0) @maxValue(65535) ano: integer;

  /**
   * Visão FindOne de um campus.
   */
  campus: CampusFindOneResultView;

  /**
   * Visão FindOne de uma oferta de formação.
   */
  ofertaFormacao: OfertaFormacaoFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model CalendarioLetivoListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um calendário letivo.
   */
  data: CalendarioLetivoFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model CalendarioLetivoInputCreateView {
  /**
   * Nome do calendário letivo.
   */
  nome: string;

  /**
   * Ano do calendário letivo.
   */
  @minValue(0) @maxValue(65535) ano: integer;

  /**
   * Dados de entrada para encontrar um campus por id.
   */
  campus: CampusFindOneInputView;

  /**
   * Dados de entrada para encontrar uma oferta de formação por ID.
   */
  ofertaFormacao: OfertaFormacaoFindOneInputView;
}

model CalendarioLetivoInputUpdateView {
  /**
   * Nome do calendário letivo.
   */
  nome?: string;

  /**
   * Ano do calendário letivo.
   */
  @minValue(0) @maxValue(65535) ano?: integer;

  /**
   * Dados de entrada para encontrar um campus por id.
   */
  campus?: CampusFindOneInputView;

  /**
   * Dados de entrada para encontrar uma oferta de formação por ID.
   */
  ofertaFormacao?: OfertaFormacaoFindOneInputView;
}

model GradeHorarioOfertaFormacaoFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Visão FindOne de um campus.
   */
  campus: CampusFindOneResultView;

  /**
   * Visão FindOne de uma oferta de formação.
   */
  ofertaFormacao: OfertaFormacaoFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model GradeHorarioOfertaFormacaoListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de uma oferta de formação.
   */
  data: GradeHorarioOfertaFormacaoFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model GradeHorarioOfertaFormacaoInputCreateView {
  /**
   * Dados de entrada para encontrar um campus por id.
   */
  campus: CampusFindOneInputView;

  /**
   * Dados de entrada para encontrar uma oferta de formação por ID.
   */
  ofertaFormacao: OfertaFormacaoFindOneInputView;
}

model GradeHorarioOfertaFormacaoInputUpdateView {
  /**
   * Dados de entrada para encontrar um campus por id.
   */
  campus?: CampusFindOneInputView;

  /**
   * Dados de entrada para encontrar uma oferta de formação por ID.
   */
  ofertaFormacao?: OfertaFormacaoFindOneInputView;
}

model IntervaloDeTempoFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Horário que o intervalo de tempo inicia.
   */
  periodoInicio: plainTime;

  /**
   * Horário que o intervalo de tempo termina.
   */
  periodoFim: plainTime;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Visão FindOne de uma oferta de formação.
   */
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoFindOneResultView;

  /**
   * Visão FindOne de um Intervalo de Tempo.
   */
  intervaloDeTempo: IntervaloDeTempoFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model GradeHorarioOfertaFormacaoIntervaloDeTempoListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de uma oferta de formação.
   */
  data: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model GradeHorarioOfertaFormacaoFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "GradeHorarioOfertaFormacao")
  @format("uuid")
  id: string;
}

model IntervaloDeTempoInputView {
  /**
   * Horário que o intervalo de tempo inicia.
   */
  periodoInicio: plainTime;

  /**
   * Horário que o intervalo de tempo termina.
   */
  periodoFim: plainTime;
}

model GradeHorarioOfertaFormacaoIntervaloDeTempoInputCreateView {
  /**
   * Dados de entrada para encontrar uma oferta de formação por ID.
   */
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoFindOneInputView;

  /**
   * Dados de entrada para um Intervalo de Tempo.
   */
  intervaloDeTempo: IntervaloDeTempoInputView;
}

model GradeHorarioOfertaFormacaoIntervaloDeTempoInputUpdateView {
  /**
   * Dados de entrada para encontrar uma oferta de formação por ID.
   */
  gradeHorarioOfertaFormacao?: GradeHorarioOfertaFormacaoFindOneInputView;

  /**
   * Dados de entrada para um Intervalo de Tempo.
   */
  intervaloDeTempo?: IntervaloDeTempoInputView;
}

model EventoFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Nome do evento.
   */
  nome: string | null;

  /**
   * Regra RRule para a recorrência do evento. Segue a RFC 5545 do iCalendar.
   */
  rrule: string;

  /**
   * Cor da Evento.
   */
  cor: string | null;

  /**
   * Visão FindOne de um calendário letivo.
   */
  calendario: CalendarioLetivoFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model EventoListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um Evento.
   */
  data: EventoFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model CalendarioLetivoFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "CalendarioLetivo") @format("uuid") id: string;
}

model EventoInputCreateView {
  nome: string | null;
  rrule: string;
  cor: string | null;

  /**
   * Dados de entrada para encontrar um calendário letivo por ID.
   */
  calendario: CalendarioLetivoFindOneInputView;
}

model EventoInputUpdateView {
  nome?: string | null;
  rrule?: string;
  cor?: string | null;

  /**
   * Dados de entrada para encontrar um calendário letivo por ID.
   */
  calendario?: CalendarioLetivoFindOneInputView;
}

model DiaCalendarioFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Data.
   */
  data: plainDate;

  /**
   * Define que o dia é letivo.
   */
  diaLetivo: boolean;

  /**
   * Define que o dia é feriado.
   */
  feriado: boolean;

  /**
   * Visão FindOne de um calendário letivo.
   */
  calendario: CalendarioLetivoFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model DiaCalendarioListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um DiaCalendario.
   */
  data: DiaCalendarioFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model DiaCalendarioInputCreateView {
  /**
   * Date ISO 8601.
   */
  data: plainDate;

  feriado: boolean;
  diaLetivo: boolean;

  /**
   * Dados de entrada para encontrar um calendário letivo por ID.
   */
  calendario: CalendarioLetivoFindOneInputView | null;
}

model DiaCalendarioInputUpdateView {
  /**
   * Date ISO 8601.
   */
  data?: plainDate;

  feriado?: boolean;
  diaLetivo?: boolean;

  /**
   * Dados de entrada para encontrar um calendário letivo por ID.
   */
  calendario?: CalendarioLetivoFindOneInputView | null;
}

model EtapaFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Número da etapa.
   */
  @minValue(0) @maxValue(255) numero: integer | null;

  /**
   * Data de início.
   */
  dataInicio: plainDate;

  /**
   * Data de término.
   */
  dataTermino: plainDate;

  /**
   * Cor da etapa.
   */
  cor: string | null;

  /**
   * Visão FindOne de um calendário letivo.
   */
  calendario: CalendarioLetivoFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model EtapaListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de uma Etapa.
   */
  data: EtapaFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model EtapaInputCreateView {
  @minValue(0) @maxValue(255) numero: integer | null;

  /**
   * Date ISO 8601.
   */
  dataInicio: plainDate;

  /**
   * Date ISO 8601.
   */
  dataTermino: plainDate;

  cor: string | null;

  /**
   * Dados de entrada para encontrar um calendário letivo por ID.
   */
  calendario: CalendarioLetivoFindOneInputView;
}

model EtapaInputUpdateView {
  @minValue(0) @maxValue(255) numero?: integer | null;

  /**
   * Date ISO 8601.
   */
  dataInicio?: plainDate;

  /**
   * Date ISO 8601.
   */
  dataTermino?: plainDate;

  cor?: string | null;

  /**
   * Dados de entrada para encontrar um calendário letivo por ID.
   */
  calendario?: CalendarioLetivoFindOneInputView;
}

model TurmaFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Período da Turma.
   */
  @minLength(1) periodo: string;

  /**
   * Visão FindOne de um Curso.
   */
  curso: CursoFindOneResultView;

  /**
   * Visão FindOne de um ambiente.
   */
  ambientePadraoAula: AmbienteFindOneResultView | null;

  /**
   * Visão FindOne de uma imagem.
   */
  imagemCapa: ImagemFindOneResultView | null;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model TurmaListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de uma Turma.
   */
  data: TurmaFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model CursoFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Curso") @format("uuid") id: string;
}

model TurmaInputCreateView {
  /**
   * Período da Turma.
   */
  @minLength(1) periodo: string;

  /**
   * Dados de entrada para encontrar um Curso por ID.
   */
  curso: CursoFindOneInputView;

  /**
   * Dados de entrada para encontrar um ambiente por id.
   */
  ambientePadraoAula: AmbienteFindOneInputView | null;
}

model TurmaInputUpdateView {
  /**
   * Período da Turma.
   */
  @minLength(1) periodo?: string;

  /**
   * Dados de entrada para encontrar um Curso por ID.
   */
  curso?: CursoFindOneInputView;

  /**
   * Dados de entrada para encontrar um ambiente por id.
   */
  ambientePadraoAula?: AmbienteFindOneInputView | null;
}

model DiarioFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Situação do diário.
   */
  ativo: boolean;

  /**
   * Visão FindOne de um calendário letivo.
   */
  calendarioLetivo: CalendarioLetivoFindOneResultView;

  /**
   * Visão FindOne de uma Turma.
   */
  turma: TurmaFindOneResultView;

  /**
   * Visão FindOne de uma Disciplina.
   */
  disciplina: DisciplinaFindOneResultView;

  /**
   * Visão FindOne de um ambiente.
   */
  ambientePadrao: AmbienteFindOneResultView | null;

  /**
   * Visão FindOne de uma imagem.
   */
  imagemCapa: ImagemFindOneResultView | null;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model DiarioListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um diário.
   */
  data: DiarioFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model TurmaFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Turma") @format("uuid") id: string;
}

model DisciplinaFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Disciplina") @format("uuid") id: string;
}

model DiarioInputCreateView {
  ativo: boolean;

  /**
   * Dados de entrada para encontrar um calendário letivo por ID.
   */
  calendarioLetivo: CalendarioLetivoFindOneInputView;

  /**
   * Dados de entrada para encontrar uma Turma por ID.
   */
  turma: TurmaFindOneInputView;

  /**
   * Dados de entrada para encontrar uma Disciplina por ID.
   */
  disciplina: DisciplinaFindOneInputView;

  /**
   * Dados de entrada para encontrar um ambiente por id.
   */
  ambientePadrao: AmbienteFindOneInputView | null;
}

model DiarioInputUpdateView {
  ativo?: boolean;

  /**
   * Dados de entrada para encontrar um calendário letivo por ID.
   */
  calendarioLetivo?: CalendarioLetivoFindOneInputView;

  /**
   * Dados de entrada para encontrar uma Turma por ID.
   */
  turma?: TurmaFindOneInputView;

  /**
   * Dados de entrada para encontrar uma Disciplina por ID.
   */
  disciplina?: DisciplinaFindOneInputView;

  /**
   * Dados de entrada para encontrar um ambiente por id.
   */
  ambientePadrao?: AmbienteFindOneInputView | null;
}

model DiarioProfessorFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Situação do vínculo.
   */
  situacao: boolean;

  /**
   * Visão FindOne de um Vínculo.
   */
  perfil: PerfilFindOneResultView;

  /**
   * Visão FindOne de um diário.
   */
  diario: DiarioFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model DiarioProfessorListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um DiarioProfessor.
   */
  data: DiarioProfessorFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model PerfilFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Perfil") @format("uuid") id: string;
}

model DiarioFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Diario") @format("uuid") id: string;
}

model DiarioProfessorInputCreateView {
  situacao: boolean;

  /**
   * Dados de entrada para encontrar um Vínculo por ID.
   */
  perfil: PerfilFindOneInputView;

  /**
   * Dados de entrada para encontrar um diário por ID.
   */
  diario: DiarioFindOneInputView;
}

model DiarioProfessorInputUpdateView {
  situacao?: boolean;

  /**
   * Dados de entrada para encontrar um Vínculo por ID.
   */
  perfil?: PerfilFindOneInputView;

  /**
   * Dados de entrada para encontrar um diário por ID.
   */
  diario?: DiarioFindOneInputView;
}

model AulaFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Data da aula.
   */
  data: plainDate;

  /**
   * Modalidade da aula.
   */
  modalidade: string | null;

  /**
   * Visão FindOne de um Intervalo de Tempo.
   */
  intervaloDeTempo: IntervaloDeTempoFindOneResultView;

  /**
   * Visão FindOne de um diário.
   */
  diario: DiarioFindOneResultView;

  /**
   * Visão FindOne de um ambiente.
   */
  ambiente: AmbienteFindOneResultView | null;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model AulaListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de uma Aula.
   */
  data: AulaFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model AulaInputCreateView {
  /**
   * Date ISO 8601.
   */
  data: plainDate;

  modalidade: string | null;

  /**
   * Dados de entrada para um Intervalo de Tempo.
   */
  intervaloDeTempo: IntervaloDeTempoInputView;

  /**
   * Dados de entrada para encontrar um diário por ID.
   */
  diario: DiarioFindOneInputView;

  /**
   * Dados de entrada para encontrar um ambiente por id.
   */
  ambiente: AmbienteFindOneInputView | null;
}

model AulaInputUpdateView {
  /**
   * Date ISO 8601.
   */
  data?: plainDate;

  modalidade?: string | null;

  /**
   * Dados de entrada para um Intervalo de Tempo.
   */
  intervaloDeTempo?: IntervaloDeTempoInputView;

  /**
   * Dados de entrada para encontrar um diário por ID.
   */
  diario?: DiarioFindOneInputView;

  /**
   * Dados de entrada para encontrar um ambiente por id.
   */
  ambiente?: AmbienteFindOneInputView | null;
}

model DisponibilidadeFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Data de início.
   */
  dataInicio: plainDate;

  /**
   * Data de término.
   */
  dataFim: plainDate | null;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model DisponibilidadeListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de uma Disponibilidade.
   */
  data: DisponibilidadeFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model DisponibilidadeInputCreateView {
  /**
   * Date ISO 8601.
   */
  dataInicio: plainDate;

  /**
   * Date ISO 8601.
   */
  dataFim: plainDate | null;
}

model DisponibilidadeInputUpdateView {
  /**
   * Date ISO 8601.
   */
  dataInicio?: plainDate;

  /**
   * Date ISO 8601.
   */
  dataFim?: plainDate | null;
}

model DisponibilidadeDiaFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Regra RRule para a recorrência do evento. Segue a RFC 5545 do iCalendar.
   */
  rrule: string;

  /**
   * Visão FindOne de um Intervalo de Tempo.
   */
  intervaloDeTempo: IntervaloDeTempoFindOneResultView;

  /**
   * Visão FindOne de uma Disponibilidade.
   */
  disponibilidade: DisponibilidadeFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model DisponibilidadeDiaListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um DisponibilidadeDia.
   */
  data: DisponibilidadeDiaFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model DisponibilidadeFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Disponibilidade") @format("uuid") id: string;
}

model DisponibilidadeDiaInputCreateView {
  /**
   * Regra RRule para a recorrência do evento. Segue a RFC 5545 do iCalendar.
   */
  rrule: string;

  /**
   * Dados de entrada para um Intervalo de Tempo.
   */
  intervaloDeTempo: IntervaloDeTempoInputView;

  /**
   * Dados de entrada para encontrar uma Disponibilidade por ID.
   */
  disponibilidade: DisponibilidadeFindOneInputView;
}

model DisponibilidadeDiaInputUpdateView {
  /**
   * Regra RRule para a recorrência do evento. Segue a RFC 5545 do iCalendar.
   */
  rrule?: string;

  /**
   * Dados de entrada para um Intervalo de Tempo.
   */
  intervaloDeTempo?: IntervaloDeTempoInputView;

  /**
   * Dados de entrada para encontrar uma Disponibilidade por ID.
   */
  disponibilidade?: DisponibilidadeFindOneInputView;
}

model TurmaDisponibilidadeFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Visão FindOne de uma Disponibilidade.
   */
  disponibilidade: DisponibilidadeFindOneResultView;

  /**
   * Visão FindOne de uma Turma.
   */
  turma: TurmaFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model TurmaDisponibilidadeListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de uma TurmaDisponibilidade.
   */
  data: TurmaDisponibilidadeFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model TurmaDisponibilidadeInputCreateView {
  /**
   * Dados de entrada para encontrar uma Disponibilidade por ID.
   */
  disponibilidade: DisponibilidadeFindOneInputView;

  /**
   * Dados de entrada para encontrar uma Turma por ID.
   */
  turma: TurmaFindOneInputView;
}

model TurmaDisponibilidadeInputUpdateView {
  /**
   * Dados de entrada para encontrar uma Disponibilidade por ID.
   */
  disponibilidade?: DisponibilidadeFindOneInputView;

  /**
   * Dados de entrada para encontrar uma Turma por ID.
   */
  turma?: TurmaFindOneInputView;
}

model ProfessorDisponibilidadeFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Visão FindOne de uma Disponibilidade.
   */
  disponibilidade: DisponibilidadeFindOneResultView;

  /**
   * Visão FindOne de um Vínculo.
   */
  perfil: PerfilFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model ProfessorDisponibilidadeListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de uma ProfessorDisponibilidade.
   */
  data: ProfessorDisponibilidadeFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model ProfessorDisponibilidadeInputCreateView {
  /**
   * Dados de entrada para encontrar uma Disponibilidade por ID.
   */
  disponibilidade: DisponibilidadeFindOneInputView;

  /**
   * Dados de entrada para encontrar um Vínculo por ID.
   */
  perfil: PerfilFindOneInputView;
}

model ProfessorDisponibilidadeInputUpdateView {
  /**
   * Dados de entrada para encontrar uma Disponibilidade por ID.
   */
  disponibilidade?: DisponibilidadeFindOneInputView;

  /**
   * Dados de entrada para encontrar um Vínculo por ID.
   */
  perfil?: PerfilFindOneInputView;
}

model DiarioPreferenciaAgrupamentoFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Início da vigência da preferência de agrupamento.
   */
  dataInicio: plainDate;

  /**
   * Fim da vigência da preferência de agrupamento.
   */
  dataFim: plainDate | null;

  /**
   * Dia da semana.
   */
  @minValue(0) @maxValue(255) diaSemanaIso: integer;

  /**
   * Quantidade de aulas seguidas.
   */
  @minValue(0) @maxValue(255) aulasSeguidas: integer;

  /**
   * Visão FindOne de um Intervalo de Tempo.
   */
  intervaloDeTempo: IntervaloDeTempoFindOneResultView;

  /**
   * Visão FindOne de um diário.
   */
  diario: DiarioFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model DiarioPreferenciaAgrupamentoListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um DiarioPreferenciaAgrupamento.
   */
  data: DiarioPreferenciaAgrupamentoFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model DiarioPreferenciaAgrupamentoInputCreateView {
  /**
   * Dia da semana.
   */
  @minValue(0) @maxValue(255) diaSemanaIso: integer;

  /**
   * Quantidade de aulas seguidas.
   */
  @minValue(0) @maxValue(255) aulasSeguidas: integer;

  /**
   * Início da vigência da preferência de agrupamento.
   */
  dataInicio: plainDate;

  /**
   * Fim da vigência da preferência de agrupamento.
   */
  dataFim: plainDate | null;

  /**
   * Dados de entrada para um Intervalo de Tempo.
   */
  intervaloDeTempo: IntervaloDeTempoInputView;

  /**
   * Dados de entrada para encontrar um diário por ID.
   */
  diario: DiarioFindOneInputView;
}

model DiarioPreferenciaAgrupamentoInputUpdateView {
  /**
   * Dia da semana.
   */
  @minValue(0) @maxValue(255) diaSemanaIso?: integer;

  /**
   * Quantidade de aulas seguidas.
   */
  @minValue(0) @maxValue(255) aulasSeguidas?: integer;

  /**
   * Início da vigência da preferência de agrupamento.
   */
  dataInicio?: plainDate;

  /**
   * Fim da vigência da preferência de agrupamento.
   */
  dataFim?: plainDate | null;

  /**
   * Dados de entrada para um Intervalo de Tempo.
   */
  intervaloDeTempo?: IntervaloDeTempoInputView;

  /**
   * Dados de entrada para encontrar um diário por ID.
   */
  diario?: DiarioFindOneInputView;
}

model HorarioGeradoFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Status do horário gerado.
   */
  status: string | null;

  /**
   * Tipo do horário gerado.
   */
  tipo: string | null;

  /**
   * Data em que o horário foi gerado.
   */
  dataGeracao: utcDateTime | null;

  /**
   * Início da vigência do horário gerado.
   */
  vigenciaInicio: plainDate | null;

  /**
   * Fim da vigência do horário gerado.
   */
  vigenciaFim: plainDate | null;

  /**
   * Visão FindOne de um calendário letivo.
   */
  calendario: CalendarioLetivoFindOneResultView;

  /**
   * Data e hora da criação do registro.
   */
  dateCreated: utcDateTime;

  /**
   * Data e hora da alteração do registro.
   */
  dateUpdated: utcDateTime;

  /**
   * Data e hora da exclusão do registro.
   */
  dateDeleted: utcDateTime | null;
}

model HorarioGeradoListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um HorarioGerado.
   */
  data: HorarioGeradoFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model HorarioGeradoInputCreateView {
  /**
   * Status do horário gerado.
   */
  status: string | null;

  /**
   * Tipo do horário gerado.
   */
  tipo: string | null;

  /**
   * Data em que o horário foi gerado.
   */
  dataGeracao: utcDateTime | null;

  /**
   * Início da vigência do horário gerado.
   */
  vigenciaInicio: plainDate | null;

  /**
   * Fim da vigência do horário gerado.
   */
  vigenciaFim: plainDate | null;

  /**
   * Dados de entrada para encontrar um calendário letivo por ID.
   */
  calendario: CalendarioLetivoFindOneInputView;
}

model HorarioGeradoInputUpdateView {
  /**
   * Status do horário gerado.
   */
  status?: string | null;

  /**
   * Tipo do horário gerado.
   */
  tipo?: string | null;

  /**
   * Data em que o horário foi gerado.
   */
  dataGeracao?: utcDateTime | null;

  /**
   * Início da vigência do horário gerado.
   */
  vigenciaInicio?: plainDate | null;

  /**
   * Fim da vigência do horário gerado.
   */
  vigenciaFim?: plainDate | null;

  /**
   * Dados de entrada para encontrar um calendário letivo por ID.
   */
  calendario?: CalendarioLetivoFindOneInputView;
}

model HorarioGeradoAulaFindOneResultView {
  /**
   * Identificador do registro (uuid).
   */
  @format("uuid") id: string;

  /**
   * Data da aula gerada.
   */
  data: plainDate;

  /**
   * Visão FindOne de um Intervalo de Tempo.
   */
  intervaloDeTempo: IntervaloDeTempoFindOneResultView;

  /**
   * Visão FindOne de um DiarioProfessor.
   */
  diarioProfessor: DiarioProfessorFindOneResultView;

  /**
   * Visão FindOne de um HorarioGerado.
   */
  horarioGerado: HorarioGeradoFindOneResultView;
}

model HorarioGeradoAulaListResultView {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultMetaView;

  /**
   * Visão FindOne de um HorarioGeradoAula.
   */
  data: HorarioGeradoAulaFindOneResultView[];

  /**
   * Links da busca.
   */
  links: PaginatedResultLinksView;
}

model DiarioProfessorFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "DiarioProfessor") @format("uuid") id: string;
}

model HorarioGeradoFindOneInputView {
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "HorarioGerado") @format("uuid") id: string;
}

model HorarioGeradoAulaInputCreateView {
  /**
   * Data da aula gerada.
   */
  data: plainDate;

  /**
   * Dados de entrada para um Intervalo de Tempo.
   */
  intervaloDeTempo: IntervaloDeTempoInputView;

  /**
   * Dados de entrada para encontrar um DiarioProfessor por ID.
   */
  diarioProfessor: DiarioProfessorFindOneInputView;

  /**
   * Dados de entrada para encontrar um HorarioGerado por ID.
   */
  horarioGerado: HorarioGeradoFindOneInputView;
}

model HorarioGeradoAulaInputUpdateView {
  /**
   * Data da aula gerada.
   */
  data?: plainDate;

  /**
   * Dados de entrada para um Intervalo de Tempo.
   */
  intervaloDeTempo?: IntervaloDeTempoInputView;

  /**
   * Dados de entrada para encontrar um DiarioProfessor por ID.
   */
  diarioProfessor?: DiarioProfessorFindOneInputView;

  /**
   * Dados de entrada para encontrar um HorarioGerado por ID.
   */
  horarioGerado?: HorarioGeradoFindOneInputView;
}

@tag("base")
@route("/api/v1")
@get
op AppController_getHello(): Body<{
  service: "@ladesa-ro/api.service";
  status: "up";

  @TypeSpec.JsonSchema.oneOf
  prefix?: string | unknown;

  @TypeSpec.JsonSchema.oneOf
  version: string;

  @TypeSpec.JsonSchema.oneOf
  buildTime?: utcDateTime;

  @TypeSpec.JsonSchema.oneOf
  gitCommitHash?: string | unknown;
}>;

/**
 * Obtêm o conteúdo de um Arquivo.
 */
@tag("arquivos")
@route("/api/v1/arquivos/{id}")
@get
op ArquivoGetFile(
  @path id: string,
  @query(#{ explode: true }) `acesso.recurso.id`: string,
  @query(#{ explode: true }) `acesso.recurso.nome`: string,

  /**
   * Acesso via recurso: nome.
   */
  @query(#{ explode: true }) nomeRecurso: string,

  /**
   * Acesso via recurso: id.
   */
  @query(#{ explode: true }) idRecurso: string,
): {
  @header contentType: "application/octet-stream";
  @body body: bytes;
} | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("estados")
@route("/api/v1/base/estados")
@get
op EstadoList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],
): EstadoListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("estados")
@route("/api/v1/base/estados/{id}")
@get
op EstadoFindOneById(
  /**
   * Identificador do registro (numérico).
   */
  @minValue(1) @path id: integer,
): EstadoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cidades")
@route("/api/v1/base/cidades")
@get
op CidadeList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.estado.id`?: string[],
): CidadeListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cidades")
@route("/api/v1/base/cidades/{id}")
@get
op CidadeFindOneById(
  /**
   * Identificador do registro (numérico).
   */
  @minValue(1) @path id: integer,
): CidadeFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Obtêm informações sobre o estado de autenticação do ator.
 */
@tag("autenticacao")
@route("/api/v1/autenticacao/quem-sou-eu")
@get
op AuthWhoAmI(): AuthWhoAmIInputView | ForbiddenResponse | NotFoundResponse;

/**
 * Operação de login.
 */
@tag("autenticacao")
@route("/api/v1/autenticacao/login")
@post
op AuthLogin(
  /**
   * Dados de entrada para autenticação.
   */
  @body body: AuthLoginInputView,
): AuthSessionCredentialsView | ForbiddenResponse | NotFoundResponse;

/**
 * Obtêm as credenciais de sessão por meio do envio do token de refresh.
 */
@tag("autenticacao")
@route("/api/v1/autenticacao/login/refresh")
@post
op AuthRefresh(
  /**
   * Dados de entrada para refresh de autenticação.
   */
  @body body: AuthRefreshInputView,
): AuthSessionCredentialsView | ForbiddenResponse | NotFoundResponse;

/**
 * Operação para definir a senha inicial.
 */
@tag("autenticacao")
@route("/api/v1/autenticacao/definir-senha")
@post
op AuthSetInitialPassword(
  /**
   * Dados de entrada para definir a senha inicial.
   */
  @body body: AuthSetInitialPasswordInputView,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Operação de login.
 */
@tag("autenticacao")
@route("/api/v1/autenticacao/redefinir-senha")
@post
op AuthRecoverPassword(
  /**
   * Dados de entrada para autenticação.
   */
  @body body: AuthRecoverPasswordInputView,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("usuarios")
@route("/api/v1/usuarios")
@get
op UsuarioList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],
): UsuarioListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("usuarios")
@route("/api/v1/usuarios")
@post
op UsuarioCreate(
  /**
   * Dados de entrada para a criação de um usuário.
   */
  @body body: UsuarioInputCreateView,
): UsuarioFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("usuarios")
@route("/api/v1/usuarios/{id}")
@delete
op UsuarioDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Usuario")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("usuarios")
@route("/api/v1/usuarios/{id}")
@get
op UsuarioFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Usuario")
  @format("uuid")
  @path
  id: string,
): UsuarioFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("usuarios")
@route("/api/v1/usuarios/{id}")
@patch
op UsuarioUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Usuario")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um Usuário.
   */
  @body body: UsuarioInputUpdateView,
): UsuarioFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("usuarios")
@route("/api/v1/usuarios/{id}/imagem/capa")
@get
op UsuarioGetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Usuario")
  @format("uuid")
  @path
  id: string,
): {
  @header contentType: "image/jpeg";
  @body body: bytes;
} | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("usuarios")
@route("/api/v1/usuarios/{id}/imagem/capa")
@put
op UsuarioSetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Usuario")
  @format("uuid")
  @path
  id: string,

  @header contentType: "multipart/form-data",
  @multipartBody body: {
    file: HttpPart<unknown>;
  },
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Obtêm a imagem de perfil.
 */
@tag("usuarios")
@route("/api/v1/usuarios/{id}/imagem/perfil")
@get
op UsuarioGetImagemPerfil(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Usuario")
  @format("uuid")
  @path
  id: string,
): {
  @header contentType: "image/jpeg";
  @body body: bytes;
} | ForbiddenResponse | NotFoundResponse;

/**
 * Define a imagem de perfil.
 */
@tag("usuarios")
@route("/api/v1/usuarios/{id}/imagem/perfil")
@put
op UsuarioSetImagemPerfil(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Usuario")
  @format("uuid")
  @path
  id: string,

  @header contentType: "multipart/form-data",
  @multipartBody body: {
    file: HttpPart<unknown>;
  },
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("perfis")
@route("/api/v1/vinculos")
@get
op PerfilList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.cargo`?: string[],
  @query(#{ explode: true }) `filter.ativo`?: string[],
  @query(#{ explode: true }) `filter.campus.id`?: string[],
  @query(#{ explode: true }) `filter.usuario.id`?: string[],
): PerfilListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("perfis")
@route("/api/v1/vinculos")
@post
op PerfilUpdateOneById(
  /**
   * Dados de entrada para a alteração de vínculo de um Usuário a um Campus.
   */
  @body body: PerfilInputUpdateView,
): PerfilListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("campi")
@route("/api/v1/campi")
@get
op CampusList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.endereco.cidade.id`?: string[],
  @query(#{ explode: true }) `filter.endereco.cidade.estado.id`?: string[],
): CampusListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Operação de criação de um campus.
 */
@tag("campi")
@route("/api/v1/campi")
@post
op CampusCreate(
  /**
   * Dados de entrada para a criação de um campus.
   */
  @body body: CampusInputCreateView,
): CampusFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("campi")
@route("/api/v1/campi/{id}")
@delete
op CampusDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Campus")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("campi")
@route("/api/v1/campi/{id}")
@get
op CampusFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Campus")
  @format("uuid")
  @path
  id: string,
): CampusFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Operação de atualização de um campus.
 */
@tag("campi")
@route("/api/v1/campi/{id}")
@patch
op CampusUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Campus")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um campus.
   */
  @body body: CampusInputUpdateView,
): CampusFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("blocos")
@route("/api/v1/blocos")
@get
op BlocoList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.campus.id`?: string[],
): BlocoListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("blocos")
@route("/api/v1/blocos")
@post
op BlocoCreate(
  /**
   * Dados de entrada para a criação de um bloco.
   */
  @body body: BlocoInputCreateView,
): BlocoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("blocos")
@route("/api/v1/blocos/{id}")
@delete
op BlocoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Bloco")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("blocos")
@route("/api/v1/blocos/{id}")
@get
op BlocoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Bloco")
  @format("uuid")
  @path
  id: string,
): BlocoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("blocos")
@route("/api/v1/blocos/{id}")
@patch
op BlocoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Bloco")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um bloco.
   */
  @body body: BlocoInputUpdateView,
): BlocoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("blocos")
@route("/api/v1/blocos/{id}/imagem/capa")
@get
op BlocoGetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Bloco")
  @format("uuid")
  @path
  id: string,
): {
  @header contentType: "image/jpeg";
  @body body: bytes;
} | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("blocos")
@route("/api/v1/blocos/{id}/imagem/capa")
@put
op BlocoSetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Bloco")
  @format("uuid")
  @path
  id: string,

  @header contentType: "multipart/form-data",
  @multipartBody body: {
    file: HttpPart<unknown>;
  },
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ambientes")
@route("/api/v1/ambientes")
@get
op AmbienteList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.bloco.id`?: string[],
  @query(#{ explode: true }) `filter.bloco.campus.id`?: string[],
): AmbienteListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ambientes")
@route("/api/v1/ambientes")
@post
op AmbienteCreate(
  /**
   * Dados de entrada para a criação de um ambiente.
   */
  @body body: AmbienteInputCreateView,
): AmbienteFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ambientes")
@route("/api/v1/ambientes/{id}")
@delete
op AmbienteDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Ambiente")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ambientes")
@route("/api/v1/ambientes/{id}")
@get
op AmbienteFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Ambiente")
  @format("uuid")
  @path
  id: string,
): AmbienteFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ambientes")
@route("/api/v1/ambientes/{id}")
@patch
op AmbienteUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Ambiente")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um ambiente.
   */
  @body body: AmbienteInputUpdateView,
): AmbienteFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ambientes")
@route("/api/v1/ambientes/{id}/imagem/capa")
@get
op AmbienteGetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Ambiente")
  @format("uuid")
  @path
  id: string,
): {
  @header contentType: "image/jpeg";
  @body body: bytes;
} | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ambientes")
@route("/api/v1/ambientes/{id}/imagem/capa")
@put
op AmbienteSetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Ambiente")
  @format("uuid")
  @path
  id: string,

  @header contentType: "multipart/form-data",
  @multipartBody body: {
    file: HttpPart<unknown>;
  },
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("reservas")
@route("/api/v1/reservas")
@get
op ReservaList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.dataInicio`?: string[],
  @query(#{ explode: true }) `filter.dataTermino`?: string[],
  @query(#{ explode: true }) `intervaloDeTempo.periodoInicio`?: string[],
  @query(#{ explode: true }) `intervaloDeTempo.periodoFim`?: string[],
): ReservaListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("reservas")
@route("/api/v1/reservas")
@post
op ReservaCreate(
  /**
   * Dados de entrada para a criação de uma Reserva.
   */
  @body body: ReservaInputCreateView,
): ReservaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("reservas")
@route("/api/v1/reservas/{id}")
@delete
op ReservaDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Reserva")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("reservas")
@route("/api/v1/reservas/{id}")
@get
op ReservaFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Reserva")
  @format("uuid")
  @path
  id: string,
): ReservaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("reservas")
@route("/api/v1/reservas/{id}")
@patch
op ReservaUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Reserva")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma Reserva.
   */
  @body body: ReservaInputUpdateView,
): ReservaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("niveis-formacoes")
@route("/api/v1/niveis-formacoes")
@get
op NivelFormacaoList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],
): NivelFormacaoListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("niveis-formacoes")
@route("/api/v1/niveis-formacoes")
@post
op NivelFormacaoCreate(
  /**
   * Dados de entrada para a criação de um nível de formação.
   */
  @body body: NivelFormacaoInputCreateView,
): NivelFormacaoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("niveis-formacoes")
@route("/api/v1/niveis-formacoes/{id}")
@delete
op NivelFormacaoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "NivelFormacao")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("niveis-formacoes")
@route("/api/v1/niveis-formacoes/{id}")
@get
op NivelFormacaoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "NivelFormacao")
  @format("uuid")
  @path
  id: string,
): NivelFormacaoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("niveis-formacoes")
@route("/api/v1/niveis-formacoes/{id}")
@patch
op NivelFormacaoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "NivelFormacao")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um nível de formação.
   */
  @body body: NivelFormacaoInputUpdateView,
): NivelFormacaoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("modalidades")
@route("/api/v1/modalidades")
@get
op ModalidadeList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],
): ModalidadeListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("modalidades")
@route("/api/v1/modalidades")
@post
op ModalidadeCreate(
  /**
   * Dados de entrada para a criação de uma modalidade.
   */
  @body body: ModalidadeInputCreateView,
): ModalidadeFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("modalidades")
@route("/api/v1/modalidades/{id}")
@delete
op ModalidadeDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Modalidade")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("modalidades")
@route("/api/v1/modalidades/{id}")
@get
op ModalidadeFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Modalidade")
  @format("uuid")
  @path
  id: string,
): ModalidadeFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("modalidades")
@route("/api/v1/modalidades/{id}")
@patch
op ModalidadeUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Modalidade")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma modalidade.
   */
  @body body: ModalidadeInputUpdateView,
): ModalidadeFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes")
@route("/api/v1/ofertas-formacoes")
@get
op OfertaFormacaoList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],
): OfertaFormacaoListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes")
@route("/api/v1/ofertas-formacoes")
@post
op OfertaFormacaoCreate(
  /**
   * Dados de entrada para a criação de uma oferta de formação.
   */
  @body body: OfertaFormacaoInputCreateView,
): OfertaFormacaoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes")
@route("/api/v1/ofertas-formacoes/{id}")
@delete
op OfertaFormacaoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "OfertaFormacao")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes")
@route("/api/v1/ofertas-formacoes/{id}")
@get
op OfertaFormacaoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "OfertaFormacao")
  @format("uuid")
  @path
  id: string,
): OfertaFormacaoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes")
@route("/api/v1/ofertas-formacoes/{id}")
@patch
op OfertaFormacaoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "OfertaFormacao")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma oferta de formação.
   */
  @body body: OfertaFormacaoInputUpdateView,
): OfertaFormacaoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes-niveis-formacoes")
@route("/api/v1/ofertas-formacoes-niveis-formacoes")
@get
op OfertaFormacaoNivelFormacaoList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],
): OfertaFormacaoNivelFormacaoListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes-niveis-formacoes")
@route("/api/v1/ofertas-formacoes-niveis-formacoes")
@post
op OfertaFormacaoNivelFormacaoCreate(
  /**
   * Dados de entrada para a criação de uma oferta de formação.
   */
  @body body: OfertaFormacaoNivelFormacaoInputCreateView,
): OfertaFormacaoNivelFormacaoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes-niveis-formacoes")
@route("/api/v1/ofertas-formacoes-niveis-formacoes/{id}")
@delete
op OfertaFormacaoNivelFormacaoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "OfertaFormacaoNivelFormacao")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes-niveis-formacoes")
@route("/api/v1/ofertas-formacoes-niveis-formacoes/{id}")
@get
op OfertaFormacaoNivelFormacaoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "OfertaFormacaoNivelFormacao")
  @format("uuid")
  @path
  id: string,
): OfertaFormacaoNivelFormacaoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes-niveis-formacoes")
@route("/api/v1/ofertas-formacoes-niveis-formacoes/{id}")
@patch
op OfertaFormacaoNivelFormacaoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "OfertaFormacaoNivelFormacao")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma oferta de formação.
   */
  @body body: OfertaFormacaoNivelFormacaoInputUpdateView,
): OfertaFormacaoNivelFormacaoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cursos")
@route("/api/v1/cursos")
@get
op CursoList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.campus.id`?: string[],
  @query(#{ explode: true }) `filter.ofertaFormacao.id`?: string[],
): CursoListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cursos")
@route("/api/v1/cursos")
@post
op CursoCreate(
  /**
   * Dados de entrada para a criação de um Curso.
   */
  @body body: CursoInputCreateView,
): CursoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cursos")
@route("/api/v1/cursos/{id}")
@delete
op CursoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Curso")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cursos")
@route("/api/v1/cursos/{id}")
@get
op CursoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Curso")
  @format("uuid")
  @path
  id: string,
): CursoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cursos")
@route("/api/v1/cursos/{id}")
@patch
op CursoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Curso")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um Curso.
   */
  @body body: CursoInputUpdateView,
): CursoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cursos")
@route("/api/v1/cursos/{id}/imagem/capa")
@get
op CursoGetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Curso")
  @format("uuid")
  @path
  id: string,
): {
  @header contentType: "image/jpeg";
  @body body: bytes;
} | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cursos")
@route("/api/v1/cursos/{id}/imagem/capa")
@put
op CursoSetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Curso")
  @format("uuid")
  @path
  id: string,

  @header contentType: "multipart/form-data",
  @multipartBody body: {
    file: HttpPart<unknown>;
  },
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disciplinas")
@route("/api/v1/disciplinas")
@get
op DisciplinaList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.diarios.id`?: string[],
): DisciplinaListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disciplinas")
@route("/api/v1/disciplinas")
@post
op DisciplinaCreate(
  /**
   * Dados de entrada para a criação de uma Disciplina.
   */
  @body body: DisciplinaInputCreateView,
): DisciplinaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disciplinas")
@route("/api/v1/disciplinas/{id}")
@delete
op DisciplinaDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Disciplina")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disciplinas")
@route("/api/v1/disciplinas/{id}")
@get
op DisciplinaFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Disciplina")
  @format("uuid")
  @path
  id: string,
): DisciplinaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disciplinas")
@route("/api/v1/disciplinas/{id}")
@patch
op DisciplinaUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Disciplina")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma Disciplina.
   */
  @body body: DisciplinaInputUpdateView,
): DisciplinaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disciplinas")
@route("/api/v1/disciplinas/{id}/imagem/capa")
@get
op DisciplinaGetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Disciplina")
  @format("uuid")
  @path
  id: string,
): {
  @header contentType: "image/jpeg";
  @body body: bytes;
} | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disciplinas")
@route("/api/v1/disciplinas/{id}/imagem/capa")
@put
op DisciplinaSetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Disciplina")
  @format("uuid")
  @path
  id: string,

  @header contentType: "multipart/form-data",
  @multipartBody body: {
    file: HttpPart<unknown>;
  },
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("calendarios-letivos")
@route("/api/v1/calendarios-letivos")
@get
op CalendarioLetivoList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.campus.id`?: string[],
  @query(#{ explode: true }) `filter.ofertaFormacao.id`?: string[],
): CalendarioLetivoListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("calendarios-letivos")
@route("/api/v1/calendarios-letivos")
@post
op CalendarioLetivoCreate(
  /**
   * Dados de entrada para a criação de um calendário letivo.
   */
  @body body: CalendarioLetivoInputCreateView,
): CalendarioLetivoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("calendarios-letivos")
@route("/api/v1/calendarios-letivos/{id}")
@delete
op CalendarioLetivoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "CalendarioLetivo")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("calendarios-letivos")
@route("/api/v1/calendarios-letivos/{id}")
@get
op CalendarioLetivoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "CalendarioLetivo")
  @format("uuid")
  @path
  id: string,
): CalendarioLetivoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("calendarios-letivos")
@route("/api/v1/calendarios-letivos/{id}")
@patch
op CalendarioLetivoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "CalendarioLetivo")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um calendário letivo.
   */
  @body body: CalendarioLetivoInputUpdateView,
): CalendarioLetivoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes")
@route("/api/v1/grades-horarios-ofertas-formacoes")
@get
op GradeHorarioOfertaFormacaoList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],
): GradeHorarioOfertaFormacaoListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes")
@route("/api/v1/grades-horarios-ofertas-formacoes")
@post
op GradeHorarioOfertaFormacaoCreate(
  /**
   * Dados de entrada para a criação de uma oferta de formação.
   */
  @body body: GradeHorarioOfertaFormacaoInputCreateView,
): GradeHorarioOfertaFormacaoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes")
@route("/api/v1/grades-horarios-ofertas-formacoes/{id}")
@delete
op GradeHorarioOfertaFormacaoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "GradeHorarioOfertaFormacao")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes")
@route("/api/v1/grades-horarios-ofertas-formacoes/{id}")
@get
op GradeHorarioOfertaFormacaoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "GradeHorarioOfertaFormacao")
  @format("uuid")
  @path
  id: string,
): GradeHorarioOfertaFormacaoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes")
@route("/api/v1/grades-horarios-ofertas-formacoes/{id}")
@patch
op GradeHorarioOfertaFormacaoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "GradeHorarioOfertaFormacao")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma oferta de formação.
   */
  @body body: GradeHorarioOfertaFormacaoInputUpdateView,
): GradeHorarioOfertaFormacaoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@route("/api/v1/grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@get
op GradeHorarioOfertaFormacaoIntervaloDeTempoList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],
): GradeHorarioOfertaFormacaoIntervaloDeTempoListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@route("/api/v1/grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@post
op GradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
  /**
   * Dados de entrada para a criação de uma oferta de formação.
   */
  @body body: GradeHorarioOfertaFormacaoIntervaloDeTempoInputCreateView,
): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@route("/api/v1/grades-horarios-ofertas-formacoes-intervalos-de-tempo/{id}")
@delete
op GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "GradeHorarioOfertaFormacaoIntervaloDeTempo")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@route("/api/v1/grades-horarios-ofertas-formacoes-intervalos-de-tempo/{id}")
@get
op GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "GradeHorarioOfertaFormacaoIntervaloDeTempo")
  @format("uuid")
  @path
  id: string,
): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@route("/api/v1/grades-horarios-ofertas-formacoes-intervalos-de-tempo/{id}")
@patch
op GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "GradeHorarioOfertaFormacaoIntervaloDeTempo")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma oferta de formação.
   */
  @body body: GradeHorarioOfertaFormacaoIntervaloDeTempoInputUpdateView,
): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("eventos")
@route("/api/v1/eventos")
@get
op EventoList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.calendario.id`?: string[],
): EventoListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("eventos")
@route("/api/v1/eventos")
@post
op EventoCreate(
  /**
   * Dados de entrada para a criação de um Evento.
   */
  @body body: EventoInputCreateView,
): EventoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("eventos")
@route("/api/v1/eventos/{id}")
@delete
op EventoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Evento")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("eventos")
@route("/api/v1/eventos/{id}")
@get
op EventoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Evento")
  @format("uuid")
  @path
  id: string,
): EventoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("eventos")
@route("/api/v1/eventos/{id}")
@patch
op EventoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Evento")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um Evento.
   */
  @body body: EventoInputUpdateView,
): EventoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("dias-calendarios")
@route("/api/v1/dias-calendario")
@get
op DiaCalendarioList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.calendario.id`?: string[],
): DiaCalendarioListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("dias-calendarios")
@route("/api/v1/dias-calendario")
@post
op DiaCalendarioCreate(
  /**
   * Dados de entrada para a criação de um DiaCalendario.
   */
  @body body: DiaCalendarioInputCreateView,
): DiaCalendarioFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("dias-calendarios")
@route("/api/v1/dias-calendario/{id}")
@delete
op DiaCalendarioDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "DiaCalendario")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("dias-calendarios")
@route("/api/v1/dias-calendario/{id}")
@get
op DiaCalendarioFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "DiaCalendario")
  @format("uuid")
  @path
  id: string,
): DiaCalendarioFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("dias-calendarios")
@route("/api/v1/dias-calendario/{id}")
@patch
op DiaCalendarioUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "DiaCalendario")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um DiaCalendario.
   */
  @body body: DiaCalendarioInputUpdateView,
): DiaCalendarioFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("etapas")
@route("/api/v1/etapas")
@get
op EtapaList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.calendario.id`?: string[],
): EtapaListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("etapas")
@route("/api/v1/etapas")
@post
op EtapaCreate(
  /**
   * Dados de entrada para a criação de uma Etapa.
   */
  @body body: EtapaInputCreateView,
): EtapaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("etapas")
@route("/api/v1/etapas/{id}")
@delete
op EtapaDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Etapa")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("etapas")
@route("/api/v1/etapas/{id}")
@get
op EtapaFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Etapa")
  @format("uuid")
  @path
  id: string,
): EtapaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("etapas")
@route("/api/v1/etapas/{id}")
@patch
op EtapaUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Etapa")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma Etapa.
   */
  @body body: EtapaInputUpdateView,
): EtapaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas")
@route("/api/v1/turmas")
@get
op TurmaList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.ambientePadraoAula.nome`?: string[],
  @query(#{ explode: true }) `filter.ambientePadraoAula.codigo`?: string[],
  @query(#{ explode: true }) `filter.ambientePadraoAula.capacidade`?: string[],
  @query(#{ explode: true }) `filter.ambientePadraoAula.tipo`?: string[],
  @query(#{ explode: true }) `filter.curso.nome`?: string[],
  @query(#{ explode: true }) `filter.curso.nomeAbreviado`?: string[],
  @query(#{ explode: true }) `filter.curso.campus.id`?: string[],
  @query(#{ explode: true }) `filter.curso.modalidade.id`?: string[],
): TurmaListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas")
@route("/api/v1/turmas")
@post
op TurmaCreate(
  /**
   * Dados de entrada para a criação de uma Turma.
   */
  @body body: TurmaInputCreateView,
): TurmaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas")
@route("/api/v1/turmas/{id}")
@delete
op TurmaDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Turma")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas")
@route("/api/v1/turmas/{id}")
@get
op TurmaFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Turma")
  @format("uuid")
  @path
  id: string,
): TurmaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas")
@route("/api/v1/turmas/{id}")
@patch
op TurmaUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Turma")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma Turma.
   */
  @body body: TurmaInputUpdateView,
): TurmaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas")
@route("/api/v1/turmas/{id}/imagem/capa")
@get
op TurmaGetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Turma")
  @format("uuid")
  @path
  id: string,
): {
  @header contentType: "image/jpeg";
  @body body: bytes;
} | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas")
@route("/api/v1/turmas/{id}/imagem/capa")
@put
op TurmaSetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Turma")
  @format("uuid")
  @path
  id: string,

  @header contentType: "multipart/form-data",
  @multipartBody body: {
    file: HttpPart<unknown>;
  },
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios")
@route("/api/v1/diarios")
@get
op DiarioList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.turma.id`?: string[],
  @query(#{ explode: true }) `filter.disciplina.id`?: string[],
  @query(#{ explode: true }) `filter.ambientePadrao.id`?: string[],
  @query(#{ explode: true }) `filter.calendarioLetivo.id`?: string[],
): DiarioListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios")
@route("/api/v1/diarios")
@post
op DiarioCreate(
  /**
   * Dados de entrada para a criação de um diário.
   */
  @body body: DiarioInputCreateView,
): DiarioFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios")
@route("/api/v1/diarios/{id}")
@delete
op DiarioDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Diario")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios")
@route("/api/v1/diarios/{id}")
@get
op DiarioFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Diario")
  @format("uuid")
  @path
  id: string,
): DiarioFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios")
@route("/api/v1/diarios/{id}")
@patch
op DiarioUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Diario")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um diário.
   */
  @body body: DiarioInputUpdateView,
): DiarioFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-professores")
@route("/api/v1/diarios-professores")
@get
op DiarioProfessorList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.perfil.id`?: string[],
  @query(#{ explode: true }) `filter.diario.id`?: string[],
): DiarioProfessorListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-professores")
@route("/api/v1/diarios-professores")
@post
op DiarioProfessorCreate(
  /**
   * Dados de entrada para a criação de um DiarioProfessor.
   */
  @body body: DiarioProfessorInputCreateView,
): DiarioProfessorFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-professores")
@route("/api/v1/diarios-professores/{id}")
@delete
op DiarioProfessorDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "DiarioProfessor")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-professores")
@route("/api/v1/diarios-professores/{id}")
@get
op DiarioProfessorFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "DiarioProfessor")
  @format("uuid")
  @path
  id: string,
): DiarioProfessorFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-professores")
@route("/api/v1/diarios-professores/{id}")
@patch
op DiarioProfessorUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "DiarioProfessor")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um DiarioProfessor.
   */
  @body body: DiarioProfessorInputUpdateView,
): DiarioProfessorFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("aulas")
@route("/api/v1/aulas")
@get
op AulaList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.diario.id`?: string[],
  @query(#{ explode: true }) `filter.ambiente.id`?: string[],
): AulaListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("aulas")
@route("/api/v1/aulas")
@post
op AulaCreate(
  /**
   * Dados de entrada para a criação de uma Aula.
   */
  @body body: AulaInputCreateView,
): AulaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("aulas")
@route("/api/v1/aulas/{id}")
@delete
op AulaDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Aula")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("aulas")
@route("/api/v1/aulas/{id}")
@get
op AulaFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Aula")
  @format("uuid")
  @path
  id: string,
): AulaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("aulas")
@route("/api/v1/aulas/{id}")
@patch
op AulaUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Aula")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma Aula.
   */
  @body body: AulaInputUpdateView,
): AulaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disponibilidades")
@route("/api/v1/disponibilidades")
@get
op DisponibilidadeList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],
): DisponibilidadeListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disponibilidades")
@route("/api/v1/disponibilidades")
@post
op DisponibilidadeCreate(
  /**
   * Dados de entrada para a criação de uma Disponibilidade.
   */
  @body body: DisponibilidadeInputCreateView,
): DisponibilidadeFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disponibilidades")
@route("/api/v1/disponibilidades/{id}")
@delete
op DisponibilidadeDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Disponibilidade")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disponibilidades")
@route("/api/v1/disponibilidades/{id}")
@get
op DisponibilidadeFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Disponibilidade")
  @format("uuid")
  @path
  id: string,
): DisponibilidadeFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disponibilidades")
@route("/api/v1/disponibilidades/{id}")
@patch
op DisponibilidadeUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Disponibilidade")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma Disponibilidade.
   */
  @body body: DisponibilidadeInputUpdateView,
): DisponibilidadeFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-preferencia-agrupamento")
@route("/api/v1/diarios-preferencia-agrupamento")
@get
op DiarioPreferenciaAgrupamentoList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.diario.id`?: string[],
): DiarioPreferenciaAgrupamentoListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-preferencia-agrupamento")
@route("/api/v1/diarios-preferencia-agrupamento")
@post
op DiarioPreferenciaAgrupamentoCreate(
  /**
   * Dados de entrada para a criação de um DiarioPreferenciaAgrupamento.
   */
  @body body: DiarioPreferenciaAgrupamentoInputCreateView,
): DiarioPreferenciaAgrupamentoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-preferencia-agrupamento")
@route("/api/v1/diarios-preferencia-agrupamento/{id}")
@delete
op DiarioPreferenciaAgrupamentoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "DiarioPreferenciaAgrupamento")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-preferencia-agrupamento")
@route("/api/v1/diarios-preferencia-agrupamento/{id}")
@get
op DiarioPreferenciaAgrupamentoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "DiarioPreferenciaAgrupamento")
  @format("uuid")
  @path
  id: string,
): DiarioPreferenciaAgrupamentoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-preferencia-agrupamento")
@route("/api/v1/diarios-preferencia-agrupamento/{id}")
@patch
op DiarioPreferenciaAgrupamentoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "DiarioPreferenciaAgrupamento")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um DiarioPreferenciaAgrupamento.
   */
  @body body: DiarioPreferenciaAgrupamentoInputUpdateView,
): DiarioPreferenciaAgrupamentoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas-disponibilidades")
@route("/api/v1/turmas-disponibilidades")
@get
op TurmaDisponibilidadeList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.turma.id`?: string[],
): TurmaDisponibilidadeListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas-disponibilidades")
@route("/api/v1/turmas-disponibilidades")
@post
op TurmaDisponibilidadeCreate(
  /**
   * Dados de entrada para a criação de uma TurmaDisponibilidade.
   */
  @body body: TurmaDisponibilidadeInputCreateView,
): TurmaDisponibilidadeFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas-disponibilidades")
@route("/api/v1/turmas-disponibilidades/{id}")
@delete
op TurmaDisponibilidadeDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "TurmaDisponibilidade")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas-disponibilidades")
@route("/api/v1/turmas-disponibilidades/{id}")
@get
op TurmaDisponibilidadeFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "TurmaDisponibilidade")
  @format("uuid")
  @path
  id: string,
): TurmaDisponibilidadeFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas-disponibilidades")
@route("/api/v1/turmas-disponibilidades/{id}")
@patch
op TurmaDisponibilidadeUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "TurmaDisponibilidade")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma TurmaDisponibilidade.
   */
  @body body: TurmaDisponibilidadeInputUpdateView,
): TurmaDisponibilidadeFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("professores-disponibilidades")
@route("/api/v1/professores-disponibilidades")
@get
op ProfessorDisponibilidadeList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],

  @query(#{ explode: true }) `filter.professor.id`?: string[],
): ProfessorDisponibilidadeListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("professores-disponibilidades")
@route("/api/v1/professores-disponibilidades")
@post
op ProfessorDisponibilidadeCreate(
  /**
   * Dados de entrada para a criação de uma ProfessorDisponibilidade.
   */
  @body body: ProfessorDisponibilidadeInputCreateView,
): ProfessorDisponibilidadeFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("professores-disponibilidades")
@route("/api/v1/professores-disponibilidades/{id}")
@delete
op ProfessorDisponibilidadeDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "ProfessorDisponibilidade")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("professores-disponibilidades")
@route("/api/v1/professores-disponibilidades/{id}")
@get
op ProfessorDisponibilidadeFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "ProfessorDisponibilidade")
  @format("uuid")
  @path
  id: string,
): ProfessorDisponibilidadeFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("professores-disponibilidades")
@route("/api/v1/professores-disponibilidades/{id}")
@patch
op ProfessorDisponibilidadeUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "ProfessorDisponibilidade")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma ProfessorDisponibilidade.
   */
  @body body: ProfessorDisponibilidadeInputUpdateView,
): ProfessorDisponibilidadeFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados")
@route("/api/v1/horarios-gerados")
@get
op HorarioGeradoList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],
): HorarioGeradoListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados")
@route("/api/v1/horarios-gerados")
@post
op HorarioGeradoCreate(
  /**
   * Dados de entrada para a criação de um HorarioGerado.
   */
  @body body: HorarioGeradoInputCreateView,
): HorarioGeradoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados")
@route("/api/v1/horarios-gerados/{id}")
@delete
op HorarioGeradoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "HorarioGerado")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados")
@route("/api/v1/horarios-gerados/{id}")
@get
op HorarioGeradoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "HorarioGerado")
  @format("uuid")
  @path
  id: string,
): HorarioGeradoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados")
@route("/api/v1/horarios-gerados/{id}")
@patch
op HorarioGeradoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "HorarioGerado")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um HorarioGerado.
   */
  @body body: HorarioGeradoInputUpdateView,
): HorarioGeradoFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados-aula")
@route("/api/v1/horarios-gerados-aula")
@get
op HorarioGeradoAulaList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],
): HorarioGeradoAulaListResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados-aula")
@route("/api/v1/horarios-gerados-aula")
@post
op HorarioGeradoAulaCreate(
  /**
   * Dados de entrada para a criação de um HorarioGeradoAula.
   */
  @body body: HorarioGeradoAulaInputCreateView,
): HorarioGeradoAulaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados-aula")
@route("/api/v1/horarios-gerados-aula/{id}")
@delete
op HorarioGeradoAulaDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "HorarioGeradoAula")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados-aula")
@route("/api/v1/horarios-gerados-aula/{id}")
@get
op HorarioGeradoAulaFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "HorarioGeradoAula")
  @format("uuid")
  @path
  id: string,
): HorarioGeradoAulaFindOneResultView | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados-aula")
@route("/api/v1/horarios-gerados-aula/{id}")
@patch
op HorarioGeradoAulaUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "HorarioGeradoAula")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um HorarioGeradoAula.
   */
  @body body: HorarioGeradoAulaInputUpdateView,
): HorarioGeradoAulaFindOneResultView | ForbiddenResponse | NotFoundResponse;
