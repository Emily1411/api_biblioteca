import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { Autor } from './entities/autor.entity';
import { AutorService } from './autor.service';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { Libro } from 'src/libro/entities/libro.entity';

@Controller('autor')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Post()
  create(@Body() createAutorDto: CreateAutorDto) {
    return this.autorService.create(createAutorDto);
  }

  @Get()
  findAll(): Promise<Autor[]> {
    return this.autorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Autor> {
    return this.autorService.obtenerPorId(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAutorDto: UpdateAutorDto,
  ): Promise<Autor> {
    return this.autorService.actualizar(+id, updateAutorDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.autorService.eliminar(+id);
  }

  @Post(':id/libros')
  crearLibroParaAutor(
    @Param('id') autorId: string,
    @Body('titulo') titulo: string,
  ): Promise<Libro> {
    return this.autorService.crearLibroParaAutor(+autorId, titulo);
  }

  @Get(':id/libros')
  obtenerLibrosDeAutor(@Param('id') autorId: string): Promise<Libro[]> {
    return this.autorService.obtenerLibrosDeAutor(+autorId);
  }
}
