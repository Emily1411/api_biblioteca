import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { Autor } from '../autor/entities/autor.entity';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Libro, Autor])],
  controllers: [LibroController],
  providers: [LibroService],
})
export class LibroModule {}
