import { PartialType } from '@nestjs/mapped-types';
import { Libro } from 'src/libro/entities/libro.entity';
import { CreateAutorDto } from './create-autor.dto';

export class UpdateAutorDto extends PartialType(CreateAutorDto)
{ 
}
