import { Repository } from 'typeorm';
import { Libro } from './entities/libro.entity';
import { Autor } from '../autor/entities/autor.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LibroService {
   constructor(
    @InjectRepository(Libro)
    private readonly libroRepo: Repository<Libro>,
    @InjectRepository(Autor)
    private readonly autorRepo: Repository<Autor>,
  ) {}
  
  async create(createLibroDto: CreateLibroDto): Promise<Libro> {
    const autor = await this.autorRepo.findOneBy({ id: createLibroDto.autorId });
    if (!autor) {
      throw new NotFoundException('Autor no encontrado');
    }

    const libro = this.libroRepo.create({
      titulo: createLibroDto.titulo,
      isbn: createLibroDto.isbn,
      autor,
    });

    return this.libroRepo.save(libro);
  }

  findAll() {
    return `This action returns all libro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} libro`;
  }

  update(id: number, updateLibroDto: UpdateLibroDto) {
    return `This action updates a #${id} libro`;
  }

  remove(id: number) {
    return `This action removes a #${id} libro`;
  }
}
