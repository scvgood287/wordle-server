import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './service';
import { ApiModule } from '../api.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ApiModule,
  ],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {};