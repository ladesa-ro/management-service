export const ConfigTokens = {
  DatabaseOptions: {
    Schema: Symbol("DatabaseOptions.Schema"),
    Url: Symbol("DatabaseOptions.Url"),
    UseSSL: Symbol("DatabaseOptions.UseSSL"),
  },
  RuntimeOptions: {
    NodeEnv: Symbol("RuntimeOptions.NodeEnv"),
    Port: Symbol("RuntimeOptions.Port"),
    ApiPrefix: Symbol("RuntimeOptions.ApiPrefix"),
    BuildTime: Symbol("RuntimeOptions.BuildTime"),
    GitCommitHash: Symbol("RuntimeOptions.GitCommitHash"),
    SwaggerServers: Symbol("RuntimeOptions.SwaggerServers"),
    StoragePath: Symbol("RuntimeOptions.StoragePath"),
    ApiVersion: Symbol("RuntimeOptions.ApiVersion"),
    EnableMockAccessToken: Symbol("RuntimeOptions.EnableMockAccessToken"),
    AppPublicBaseUrl: Symbol("RuntimeOptions.AppPublicBaseUrl"),
  },
  AuthOptions: {
    Oidc: {
      Issuer: Symbol("AuthOptions.Oidc.Issuer"),
      ClientId: Symbol("AuthOptions.Oidc.ClientId"),
      ClientSecret: Symbol("AuthOptions.Oidc.ClientSecret"),
    },
    Keycloak: {
      BaseUrl: Symbol("AuthOptions.Keycloak.BaseUrl"),
      Realm: Symbol("AuthOptions.Keycloak.Realm"),
      ClientId: Symbol("AuthOptions.Keycloak.ClientId"),
      ClientSecret: Symbol("AuthOptions.Keycloak.ClientSecret"),
      PasswordResetRedirectUri: Symbol("AuthOptions.Keycloak.PasswordResetRedirectUri"),
    },
  },
  QueueOptions: {
    Url: Symbol("QueueOptions.Url"),
    Schema: Symbol("QueueOptions.Schema"),
    QueueTimetableGenerate: Symbol("QueueOptions.QueueTimetableGenerate"),
    QueueFolhaPontoWhatsapp: Symbol("QueueOptions.QueueFolhaPontoWhatsapp"),
  },
  WhatsAppOptions: {
    BaseUrl: Symbol("WhatsAppOptions.BaseUrl"),
    ApiKey: Symbol("WhatsAppOptions.ApiKey"),
    Timeout: Symbol("WhatsAppOptions.Timeout"),
    Session: Symbol("WhatsAppOptions.Session"),
    WebhookHmacKey: Symbol("WhatsAppOptions.WebhookHmacKey"),
  },
} as const;
