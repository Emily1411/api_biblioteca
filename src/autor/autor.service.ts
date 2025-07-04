// autor.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from './entities/autor.entity';
import { Libro } from 'src/libro/entities/libro.entity';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';

@Injectable()
export class AutorService {
  constructor(
    @InjectRepository(Autor)
    private autorRepository: Repository<Autor>,
    @InjectRepository(Libro)
    private libroRepository: Repository<Libro>,
  ) {}
 

    async findAll(): Promise<Autor[]> {
        return await this.autorRepository.find({ relations: ['libros'] });
    }

  async create(createAutorDto: CreateAutorDto): Promise<Autor> {
    // Verifica que libros es un array antes de usar map
    const libros = Array.isArray(createAutorDto.libros) 
        ? createAutorDto.libros.map(id => ({ id })) 
        : [];
    
    const autor = this.autorRepository.create({
        nombre: createAutorDto.nombre,
        libros: libros,
    });
    
    return await this.autorRepository.save(autor);
  }

  async obtenerPorId(id: number): Promise<Autor> {
    const autor = await this.autorRepository.findOne({ 
        where: { id },
        relations: ['libros']
    });
    
    if (!autor) {
        throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }
    
    return autor;
}
  
  async actualizar(
    id: number,
    updateAutorDto: UpdateAutorDto,
  ): Promise<Autor> {
    const libros = Array.isArray(updateAutorDto.libros) 
            ? updateAutorDto.libros.map(id => ({ id }))
            : [];
            
        await this.autorRepository.update(id, {
            nombre: updateAutorDto.nombre,
            libros: libros
        });
        
        return this.obtenerPorId(id);
    }
  

  // Eliminar un autor
  async eliminar(id: number): Promise<void> {
    const autor = await this.obtenerPorId(id);
    await this.autorRepository.remove(autor);
  }

  // Crear un libro asociado a un autor
  async crearLibroParaAutor(
    autorId: number,
    titulo: string,
  ): Promise<Libro> {
    const autor = await this.obtenerPorId(autorId);

    const libro = this.libroRepository.create({
      titulo,
      autor,
    });

    return await this.libroRepository.save(libro);
  }

  // Obtener libros de un autor
  async obtenerLibrosDeAutor(autorId: number): Promise<Libro[]> {
    await this.obtenerPorId(autorId); // Verifica que el autor existe
    return await this.libroRepository.find({
      where: { autor: { id: autorId } },
    });
  }
}