import { envSchema } from 'src/domain/backup/application/env/env-schema';
import { z } from 'zod';

export type Env = z.infer<typeof envSchema>;
