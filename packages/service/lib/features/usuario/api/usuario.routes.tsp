import "@typespec/http";
import "@typespec/json-schema";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;
using JsonSchema;

namespace Ladesa.ManagementService;

/**
 * Sem descrição.
 */
@tag("usuarios")
@route("/usuarios")
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
@route("/usuarios")
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
@route("/usuarios/{id}")
@delete
op UsuarioDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Usuario"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("usuarios")
@route("/usuarios/{id}")
@get
op UsuarioFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Usuario"
  )
  @format("uuid")
  @path
  id: string,
): UsuarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("usuarios")
@route("/usuarios/{id}/ensino")
@get
op UsuarioEnsinoById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Usuario"
  )
  @format("uuid")
  @path
  id: string,
): UsuarioEnsinoOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("usuarios")
@route("/usuarios/{id}")
@patch(#{implicitOptionality: false})
op UsuarioUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Usuario"
  )
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
@route("/usuarios/{id}/imagem/capa")
@get
op UsuarioGetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Usuario"
  )
  @format("uuid")
  @path
  id: string,

  @query(#{explode: true}) imgCapa?: string,
): {
  @header contentType: "image/jpeg";
  @body body: bytes;
} | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("usuarios")
@route("/usuarios/{id}/imagem/capa")
@put
op UsuarioSetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Usuario"
  )
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
@route("/usuarios/{id}/imagem/perfil")
@get
op UsuarioGetImagemPerfil(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Usuario"
  )
  @format("uuid")
  @path
  id: string,

  @query(#{explode: true}) imgCapa?: string,
): {
  @header contentType: "image/jpeg";
  @body body: bytes;
} | ForbiddenResponse | NotFoundResponse;

/**
 * Define a imagem de perfil.
 */
@tag("usuarios")
@route("/usuarios/{id}/imagem/perfil")
@put
op UsuarioSetImagemPerfil(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Usuario"
  )
  @format("uuid")
  @path
  id: string,

  @header contentType: "multipart/form-data",
  @multipartBody body: {
    file: HttpPart<unknown>;
  },
): Body<boolean> | ForbiddenResponse | NotFoundResponse;
