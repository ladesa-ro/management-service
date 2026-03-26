import { ConfigTokens } from "../config-tokens";
import { EnvKeys } from "../env-keys";

export const ConfigTokensMap = new Map<symbol, string>([
  [ConfigTokens.DatabaseOptions.Schema, EnvKeys.DB_SCHEMA],
  [ConfigTokens.DatabaseOptions.Url, EnvKeys.DATABASE_URL],
  [ConfigTokens.DatabaseOptions.UseSSL, EnvKeys.DATABASE_USE_SSL],
  [ConfigTokens.RuntimeOptions.NodeEnv, EnvKeys.NODE_ENV],
  [ConfigTokens.RuntimeOptions.Port, EnvKeys.PORT],
  [ConfigTokens.RuntimeOptions.ApiPrefix, EnvKeys.API_PREFIX],
  [ConfigTokens.RuntimeOptions.BuildTime, EnvKeys.BUILD_TIME],
  [ConfigTokens.RuntimeOptions.GitCommitHash, EnvKeys.GIT_COMMIT_HASH],
  [ConfigTokens.RuntimeOptions.SwaggerServers, EnvKeys.SWAGGER_SERVERS],
  [ConfigTokens.RuntimeOptions.StoragePath, EnvKeys.STORAGE_PATH],
  [ConfigTokens.RuntimeOptions.ApiVersion, EnvKeys.LADESA_API_VERSION],
  [ConfigTokens.RuntimeOptions.EnableMockAccessToken, EnvKeys.ENABLE_MOCK_ACCESS_TOKEN],
  [ConfigTokens.AuthOptions.Oidc.Issuer, EnvKeys.OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER],
  [ConfigTokens.AuthOptions.Oidc.ClientId, EnvKeys.OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_ID],
  [
    ConfigTokens.AuthOptions.Oidc.ClientSecret,
    EnvKeys.OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_SECRET,
  ],
  [ConfigTokens.AuthOptions.Keycloak.BaseUrl, EnvKeys.KC_BASE_URL],
  [ConfigTokens.AuthOptions.Keycloak.Realm, EnvKeys.KC_REALM],
  [ConfigTokens.AuthOptions.Keycloak.ClientId, EnvKeys.KC_CLIENT_ID],
  [ConfigTokens.AuthOptions.Keycloak.ClientSecret, EnvKeys.KC_CLIENT_SECRET],
  [
    ConfigTokens.AuthOptions.Keycloak.PasswordResetRedirectUri,
    EnvKeys.KC_PASSWORD_RESET_REDIRECT_URI,
  ],
  [ConfigTokens.MessageBrokerOptions.Url, EnvKeys.MESSAGE_BROKER_URL],
  [
    ConfigTokens.MessageBrokerOptions.QueueTimetableRequest,
    EnvKeys.MESSAGE_BROKER_QUEUE_TIMETABLE_REQUEST,
  ],
  [
    ConfigTokens.MessageBrokerOptions.QueueTimetableResponse,
    EnvKeys.MESSAGE_BROKER_QUEUE_TIMETABLE_RESPONSE,
  ],
]);
