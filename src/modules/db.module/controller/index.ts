import { Controller } from '@nestjs/common';
import { DBService } from '../service';

@Controller('cache-db')
export class DBController {
  constructor(
    private readonly dbService: DBService
  ) {}
  
  
}