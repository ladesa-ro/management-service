export interface IIdentityResponse {
  usuario?: {
    matricula?: string;
  };
}

export const IIdentityProvider = Symbol("IIdentityProvider");

export interface IIdentityProvider {
  getIdentityFromAccessToken(accessToken: string): Promise<IIdentityResponse>;
}
