import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { GetPublicKeyOrSecret, JwtPayload, verify } from "jsonwebtoken";
import { LRUCache } from "lru-cache";
import type { IntrospectionResponse } from "openid-client";
import { tokenIntrospection } from "openid-client";
import { JwksRsaClientService } from "./jwks-rsa-client";
import { OpenidConnectService } from "./openid-connect";

interface IntrospectionResponseWithUser extends IntrospectionResponse {
  usuario: {
    matriculaSiape: string;
  };
}

@Injectable()
export class IdentityProviderService {
  constructor(
    private openIdConnectService: OpenidConnectService,
    private jwksRsaClientService: JwksRsaClientService,
  ) {}

  #cache = new LRUCache<string, IntrospectionResponseWithUser>({
    max: 500,
    ttl: 1000 * 10,
    allowStale: false,
  });

  async getIdentityResponseFromAccessTokenHard(accessToken: string) {
    const config = await this.openIdConnectService.getClientConfig();

    try {
      const tokenset = await tokenIntrospection(config, accessToken);

      if (tokenset.active !== false) {
        return tokenset as IntrospectionResponseWithUser;
      }
    } catch (_e) {}

    throw new UnauthorizedException("The provided access token is either invalid or expired.");
  }

  async getIdentityResponseFromAccessTokenSoft(accessToken: string) {
    if (!this.#cache.has(accessToken)) {
      // cache miss

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

  async getIdentityResponseFromAccessToken(accessToken: string) {
    return this.getIdentityResponseFromAccessTokenSoft(accessToken);
  }

  private async jwtVerifyAccessToken(accessToken: string) {
    const getKeyFromHeader: GetPublicKeyOrSecret = async (header, callback) => {
      const kid = header.kid;

      if (kid) {
        const publicKey = await this.jwksRsaClientService.getSigninKeyPublicKeyByKid(kid);

        if (publicKey) {
          callback(null, publicKey);
        } else {
          callback(new InternalServerErrorException());
        }
      }

      callback(new Error());
    };

    return new Promise<null | JwtPayload>((resolve) => {
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
