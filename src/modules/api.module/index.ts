import { Module } from '@nestjs/common';
import { ApiController } from './controller';
import { ApiService } from './service';
import { CacheDBModule } from '../cache-db.module';
import { DBModule } from '../db.module';

@Module({
  imports: [CacheDBModule, DBModule],
  controllers: [ApiController],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
