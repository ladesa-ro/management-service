import "@typespec/http";
import "@typespec/json-schema";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;
using JsonSchema;

namespace Ladesa.ManagementService;

/**
 * Obtêm informações sobre o estado de autenticação do ator.
 */
@tag("autenticacao")
@route("/autenticacao/quem-sou-eu")
@get
op AuthWhoAmI(): AuthWhoAmIOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Obtêm informações sobre o estado de autenticação do ator.
 */
@tag("autenticacao")
@route("/autenticacao/quem-sou-eu/ensino")
@get
op AuthWhoAmIEnsino(): UsuarioEnsinoOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Operação de login.
 */
@tag("autenticacao")
@route("/autenticacao/login")
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
@route("/autenticacao/login/refresh")
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
@route("/autenticacao/definir-senha")
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
@route("/autenticacao/redefinir-senha")
@post
op AuthRecoverPassword(
  /**
   * Dados de entrada para autenticação.
   */
  @body body: AuthRecoverPasswordInput,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;
