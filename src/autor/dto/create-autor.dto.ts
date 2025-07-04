import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Libro } from 'src/libro/entities/libro.entity';

export  class CreateAutorDto{
    @IsNotEmpty()
    @IsString()
    nombre : string;
    @IsNotEmpty()
    @IsInt({each: true})
    libros : number;
}