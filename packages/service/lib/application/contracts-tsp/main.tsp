import "@typespec/http";
import "@typespec/json-schema";
import "@typespec/openapi";
import "@typespec/openapi3";
import "../../domain/contracts-tsp/main.tsp";

using Http;
using OpenAPI;
using JsonSchema;
using Ladesa.ManagementService.Domain.Contracts;

/**
 * API para a consulta e manipulação de dados e procedimentos relacionados ao Sistema de Gestão Acadêmico.
 */
@service(#{ title: "Ladesa - API" })
@info(#{ version: "0.0", contact: #{} })
namespace LadesaAPI;

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
): EstadoListOutput | ForbiddenResponse | NotFoundResponse;

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
): EstadoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): CidadeListOutput | ForbiddenResponse | NotFoundResponse;

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
): CidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Obtêm informações sobre o estado de autenticação do ator.
 */
@tag("autenticacao")
@route("/api/v1/autenticacao/quem-sou-eu")
@get
op AuthWhoAmI(): AuthWhoAmIOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: AuthLoginInput,
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
  @body body: AuthRefreshInput,
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
  @body body: AuthCredentialsSetInitialPasswordInput,
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
  @body body: AuthRecoverPasswordInput,
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
): UsuarioListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: UsuarioCreateInput,
): UsuarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): UsuarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: UsuarioUpdateInput,
): UsuarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
@route("/api/v1/perfis")
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
): PerfilListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("perfis")
@route("/api/v1/perfis")
@post
op PerfilUpdateOneById(
  /**
   * Dados de entrada para a alteração de vínculo de um Usuário a um Campus.
   */
  @body body: PerfilUpdateInput,
): PerfilListOutput | ForbiddenResponse | NotFoundResponse;

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
): CampusListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: CampusCreateInput,
): CampusFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): CampusFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: CampusUpdateInput,
): CampusFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): BlocoListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: BlocoCreateInput,
): BlocoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): BlocoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: BlocoUpdateInput,
): BlocoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): AmbienteListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: AmbienteCreateInput,
): AmbienteFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): AmbienteFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: AmbienteUpdateInput,
): AmbienteFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): ReservaListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: ReservaCreateInput,
): ReservaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): ReservaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: ReservaUpdateInput,
): ReservaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): NivelFormacaoListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: NivelFormacaoCreateInput,
): NivelFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): NivelFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: NivelFormacaoUpdateInput,
): NivelFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): ModalidadeListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: ModalidadeCreateInput,
): ModalidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): ModalidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: ModalidadeUpdateInput,
): ModalidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): OfertaFormacaoListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: OfertaFormacaoCreateInput,
): OfertaFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): OfertaFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: OfertaFormacaoUpdateInput,
): OfertaFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): OfertaFormacaoNivelFormacaoListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: OfertaFormacaoNivelFormacaoCreateInput,
): OfertaFormacaoNivelFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): OfertaFormacaoNivelFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: OfertaFormacaoNivelFormacaoUpdateInput,
): OfertaFormacaoNivelFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): CursoListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: CursoCreateInput,
): CursoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): CursoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: CursoUpdateInput,
): CursoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): DisciplinaListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: DisciplinaCreateInput,
): DisciplinaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): DisciplinaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: DisciplinaUpdateInput,
): DisciplinaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): CalendarioLetivoListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: CalendarioLetivoCreateInput,
): CalendarioLetivoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): CalendarioLetivoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: CalendarioLetivoUpdateInput,
): CalendarioLetivoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): GradeHorarioOfertaFormacaoListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: GradeHorarioOfertaFormacaoCreateInput,
): GradeHorarioOfertaFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): GradeHorarioOfertaFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: GradeHorarioOfertaFormacaoUpdateInput,
): GradeHorarioOfertaFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput,
): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput,
): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): EventoListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: EventoCreateInput,
): EventoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): EventoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: EventoUpdateInput,
): EventoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): DiaCalendarioListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: DiaCalendarioCreateInput,
): DiaCalendarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): DiaCalendarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: DiaCalendarioUpdateInput,
): DiaCalendarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): EtapaListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: EtapaCreateInput,
): EtapaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): EtapaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: EtapaUpdateInput,
): EtapaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): TurmaListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: TurmaCreateInput,
): TurmaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): TurmaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: TurmaUpdateInput,
): TurmaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): DiarioListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: DiarioCreateInput,
): DiarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): DiarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: DiarioUpdateInput,
): DiarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): DiarioProfessorListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: DiarioProfessorCreateInput,
): DiarioProfessorFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): DiarioProfessorFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: DiarioProfessorUpdateInput,
): DiarioProfessorFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): AulaListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: AulaCreateInput,
): AulaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): AulaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: AulaUpdateInput,
): AulaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): DisponibilidadeListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: DisponibilidadeCreateInput,
): DisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): DisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: DisponibilidadeUpdateInput,
): DisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): DiarioPreferenciaAgrupamentoListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: DiarioPreferenciaAgrupamentoCreateInput,
): DiarioPreferenciaAgrupamentoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): DiarioPreferenciaAgrupamentoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: DiarioPreferenciaAgrupamentoUpdateInput,
): DiarioPreferenciaAgrupamentoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): TurmaDisponibilidadeListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: TurmaDisponibilidadeCreateInput,
): TurmaDisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): TurmaDisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: TurmaDisponibilidadeUpdateInput,
): TurmaDisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): ProfessorDisponibilidadeListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: ProfessorDisponibilidadeCreateInput,
): ProfessorDisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): ProfessorDisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: ProfessorDisponibilidadeUpdateInput,
): ProfessorDisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): HorarioGeradoListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: HorarioGeradoCreateInput,
): HorarioGeradoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): HorarioGeradoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: HorarioGeradoUpdateInput,
): HorarioGeradoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): HorarioGeradoAulaListOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: HorarioGeradoAulaCreateInput,
): HorarioGeradoAulaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
): HorarioGeradoAulaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
  @body body: HorarioGeradoAulaUpdateInput,
): HorarioGeradoAulaFindOneOutput | ForbiddenResponse | NotFoundResponse;