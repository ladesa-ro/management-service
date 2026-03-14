export class AuthSessionCredentials {
  access_token!: string | null;
  token_type!: string | null;
  id_token!: string | null;
  refresh_token!: string | null;
  expires_in!: number | null;
  expires_at!: number | null;
  session_state!: string | null;
  scope!: string | null;
}
