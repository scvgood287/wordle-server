import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DBController } from './controller';
import { DBService } from './service';

export const MongoDBModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGO_DB_URL'),
  }),
})

@Module({
  imports: [MongoDBModule],
  controllers: [DBController],
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {};
