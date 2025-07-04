// prestamo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { Prestamo } from './entities/prestamo.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Libro } from '../libro/entities/libro.entity';

@Injectable()
export class PrestamoService {
  constructor(
    @InjectRepository(Prestamo)
    private readonly prestamoRepo: Repository<Prestamo>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Libro)
    private readonly libroRepo: Repository<Libro>,
  ) {}

  async create(createPrestamoDto: CreatePrestamoDto): Promise<Prestamo> {
    const usuario = await this.usuarioRepo.findOne({ 
      where: { id: createPrestamoDto.usuarioId }
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${createPrestamoDto.usuarioId} no encontrado`);
    }

    const libro = await this.libroRepo.findOne({ 
      where: { id: createPrestamoDto.libroId }
    });
    if (!libro) {
      throw new NotFoundException(`Libro con ID ${createPrestamoDto.libroId} no encontrado`);
    }

    const prestamo = this.prestamoRepo.create({
      usuarioId: usuario.id, // Usar usuarioId en lugar de usuario
      libroId: libro.id,     // Usar libroId en lugar de libro
      fechaPrestamo: new Date(createPrestamoDto.fechaPrestamo),
      fechaDevolucion: new Date(createPrestamoDto.fechaDevolucion),
    });

    return await this.prestamoRepo.save(prestamo);
  }

  async findAll(): Promise<Prestamo[]> {
    return this.prestamoRepo.find({
      relations: ['usuario', 'libro']
    });
  }

  async findOne(id: number): Promise<Prestamo> {
    const prestamo = await this.prestamoRepo.findOne({
      where: { id },
      relations: ['usuario', 'libro']
    });

    if (!prestamo) {
      throw new NotFoundException(`Préstamo con ID ${id} no encontrado`);
    }

    return prestamo;
  }

  async update(id: number, updatePrestamoDto: UpdatePrestamoDto): Promise<Prestamo> {
    const prestamo = await this.findOne(id);

    if (updatePrestamoDto.usuarioId !== undefined) {
      const usuario = await this.usuarioRepo.findOne({ 
        where: { id: updatePrestamoDto.usuarioId }
      });
      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${updatePrestamoDto.usuarioId} no encontrado`);
      }
      prestamo.usuarioId = usuario.id;
    }

    if (updatePrestamoDto.libroId !== undefined) {
      const libro = await this.libroRepo.findOne({ 
        where: { id: updatePrestamoDto.libroId }
      });
      if (!libro) {
        throw new NotFoundException(`Libro con ID ${updatePrestamoDto.libroId} no encontrado`);
      }
      prestamo.libroId = libro.id;
    }

    if (updatePrestamoDto.fechaPrestamo !== undefined) {
      prestamo.fechaPrestamo = new Date(updatePrestamoDto.fechaPrestamo);
    }

    if (updatePrestamoDto.fechaDevolucion !== undefined) {
      prestamo.fechaDevolucion = new Date(updatePrestamoDto.fechaDevolucion);
    }

    return this.prestamoRepo.save(prestamo);
  }

  async remove(id: number): Promise<void> {
    const prestamo = await this.findOne(id);
    await this.prestamoRepo.remove(prestamo);
  }
}