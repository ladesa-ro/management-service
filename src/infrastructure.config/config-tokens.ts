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
    },
  },
  MessageBrokerOptions: {
    Url: Symbol("MessageBrokerOptions.Url"),
    QueueTimetableRequest: Symbol("MessageBrokerOptions.QueueTimetableRequest"),
    QueueTimetableResponse: Symbol("MessageBrokerOptions.QueueTimetableResponse"),
  },
} as const;
