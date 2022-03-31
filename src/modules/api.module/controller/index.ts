import { Controller, Get, Param, Put } from '@nestjs/common';
import { ApiService } from '../service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('todays-word')
  async getTodaysWord(): Promise<string> {
    return await this.apiService.getTodaysWord();
  };

  @Get('check-word/:word')
  async checkWord(@Param('word') word: string): Promise<boolean> {
    return await this.apiService.checkWord(word);
  };

  @Get('')
  healthCheck() {
    return "ok";
  };
};