import { Controller } from '@nestjs/common';
import { AutorService } from './autor.service';

@Controller('autor')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}
}
