import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { z } from 'zod';
import { EnvService } from '../env/env.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { UserType } from 'src/domain/backup/enums/user-type';

const tokenPayload = z.object({
  sub: z.string().uuid(),
  sessionId: z.string(),
  role: z.nativeEnum(UserType),
});

export type UserPayload = z.infer<typeof tokenPayload>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: EnvService,
    private prisma: PrismaService,
  ) {
    const jwtSecret = config.get('JWT_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      algorithms: ['HS256'],
    });
  }

  async validate(payload: UserPayload) {
    if (!payload.sessionId) {
      return false;
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id_user: payload.sub,
        session_id: payload.sessionId,
      },
    });

    if (!user) {
      return false;
    }

    return tokenPayload.parse(payload);
  }
}
