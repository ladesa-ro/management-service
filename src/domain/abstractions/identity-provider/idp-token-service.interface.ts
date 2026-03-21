export interface ITokenSet {
  access_token: string | null;
  token_type: string | null;
  id_token: string | null;
  refresh_token: string | null;
  expires_in: number | null;
  expires_at: number | null;
  session_state: string | null;
  scope: string | null;
}

export const IIdpTokenService = Symbol("IIdpTokenService");

export interface IIdpTokenService {
  passwordGrant(username: string, password: string): Promise<ITokenSet>;
  refreshGrant(refreshToken: string): Promise<ITokenSet>;
}
