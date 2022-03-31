import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiService } from 'src/modules/api.module/service';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly apiService: ApiService
  ) {}

  @Cron(CronExpression.EVERY_MINUTE, { name: "test" })
  handleCron() {
    this.logger.log("ok");
    console.log("ok");
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: 'update-todays-word', utcOffset: "+09:00" })
  async updateTodaysWord() {
    await this.apiService.updateTodaysWord();
  }

  // @Cron(CronExpression.EVERY_DAY_AT_1AM, { name: 'back-up', utcOffset: "+09:00" })
  // async backUp() {
  //   await this.apiService.backUp();
  // }
};