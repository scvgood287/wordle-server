import { Module } from '@nestjs/common';

import { ConfigsModule } from './configs.module';
import { ApiModule } from './api.module';
import { TaskModule } from './task.module';

@Module({
  imports: [ConfigsModule, ApiModule, TaskModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class RootModule {};
