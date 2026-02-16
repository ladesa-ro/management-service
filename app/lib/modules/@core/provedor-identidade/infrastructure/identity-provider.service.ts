import { Injectable, UnauthorizedException } from "@nestjs/common";
import { GetPublicKeyOrSecret, JwtPayload, verify } from "jsonwebtoken";
import { LRUCache } from "lru-cache";
import type { IntrospectionResponse } from "openid-client";
import { tokenIntrospection } from "openid-client";
import type { IIdentityResponse } from "../domain";
import type { IIdentityProviderPort } from "../ports";
import { JwksRsaClientService } from "./jwks";
import { OpenidConnectService } from "./openid-connect";

interface IntrospectionResponseWithUser extends IntrospectionResponse {
  usuario: {
    matriculaSiape: string;
  };
}

/**
 * Serviço principal de Identity Provider.
 * Implementa validação de tokens e cache de identidades.
 */
@Injectable()
export class IdentityProviderService implements IIdentityProviderPort {
  #cache = new LRUCache<string, IntrospectionResponseWithUser>({
    max: 500,
    ttl: 1000 * 10,
    allowStale: false,
  });

  constructor(
    private openIdConnectService: OpenidConnectService,
    private jwksRsaClientService: JwksRsaClientService,
  ) {}

  async getIdentityFromAccessToken(accessToken: string): Promise<IIdentityResponse> {
    return this.getIdentityResponseFromAccessTokenSoft(accessToken);
  }

  private async getIdentityResponseFromAccessTokenHard(
    accessToken: string,
  ): Promise<IntrospectionResponseWithUser> {
    const config = await this.openIdConnectService.getClientConfig();

    try {
      const tokenset = await tokenIntrospection(config, accessToken);

      if (tokenset.active !== false) {
        return tokenset as IntrospectionResponseWithUser;
      }
    } catch (_e) {}

    throw new UnauthorizedException("The provided access token is either invalid or expired.");
  }

  private async getIdentityResponseFromAccessTokenSoft(
    accessToken: string,
  ): Promise<IntrospectionResponseWithUser> {
    if (!this.#cache.has(accessToken)) {
      const identityResponse = await this.getIdentityResponseFromAccessTokenHard(accessToken);
      const decoded = await this.jwtVerifyAccessToken(accessToken);
      const exp = decoded?.exp;

      if (decoded && exp) {
        this.#cache.set(accessToken, identityResponse, {
          ttl: Math.max(exp / 1000 - new Date().getTime(), 1),
        });
      } else {
        this.#cache.set(accessToken, identityResponse, {
          ttl: 10000,
        });
      }
    }

    const identityResponse = this.#cache.get(accessToken);

    if (!identityResponse) {
      throw new UnauthorizedException("The provided access token is either invalid or expired.");
    }

    return identityResponse;
  }

  private async jwtVerifyAccessToken(accessToken: string): Promise<JwtPayload | null> {
    const getKeyFromHeader: GetPublicKeyOrSecret = async (header, callback) => {
      const kid = header.kid;

      if (kid) {
        const publicKey = await this.jwksRsaClientService.getSigninKeyPublicKeyByKid(kid);

        if (publicKey) {
          callback(null, publicKey);
        } else {
          callback(new Error("Public key not found"));
        }
      } else {
        callback(new Error("No kid in header"));
      }
    };

    return new Promise<JwtPayload | null>((resolve) => {
      verify(accessToken, getKeyFromHeader, (err, decoded) => {
        if (err) {
          resolve(null);
        } else {
          resolve(decoded as JwtPayload);
        }
      });
    });
  }
}
