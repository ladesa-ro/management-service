export interface IIdentityResponse {
  usuario?: {
    matricula?: string;
  };
}

export interface IIdentityProvider {
  getIdentityFromAccessToken(accessToken: string): Promise<IIdentityResponse>;
}

export const IIdentityProvider = Symbol("IIdentityProvider");
