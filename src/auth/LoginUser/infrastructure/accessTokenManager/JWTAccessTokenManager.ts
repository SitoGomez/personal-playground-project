import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../../shared/domain/User';
import {
  AccessTokenData,
  IAccessTokenManager,
} from '../../domain/IAccessTokenManager';

@Injectable()
export class JWTAccessTokenManager implements IAccessTokenManager {
  private static readonly ONE_DAY_IN_SECONDS = 24 * 60 * 60;
  private readonly jwtService: JwtService;

  public constructor(jwtService: JwtService) {
    this.jwtService = jwtService;
  }

  public async generateAccessTokenFromUser(user: User): Promise<string> {
    const payload: AccessTokenData = {
      sub: user.getUserId(),
      email: user.getEmail(),
      iat: Math.floor(Date.now() / 1000),
      exp:
        Math.floor(Date.now() / 1000) +
        JWTAccessTokenManager.ONE_DAY_IN_SECONDS,
      iss: 'auth.personal-playground-project.com',
      aud: 'myapp-client',
    };

    return this.jwtService.signAsync(payload);
  }

  public async verifyAccessToken(
    accessToken: string,
  ): Promise<AccessTokenData> {
    return this.jwtService.verifyAsync(accessToken);
  }
}
