
import { ConfigModule } from '@nestjs/config';

export const ConfigsModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
  ignoreEnvFile: process.env.NODE_ENV === 'prod',
});