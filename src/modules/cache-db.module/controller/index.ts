import { Controller, Get } from '@nestjs/common';
import { CacheDBService } from '../service';

@Controller('cache-db')
export class CacheDBController {
  constructor(
    private readonly cacheDBService: CacheDBService
  ) {}
  
  
}