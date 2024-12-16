import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from 'src/domain/backup/application/env/env-schema';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { AuthModule } from './infra/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    InfraModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
