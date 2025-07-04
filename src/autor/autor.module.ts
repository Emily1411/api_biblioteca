import { Module } from '@nestjs/common';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Autor } from './entities/autor.entity';
import { Libro } from 'src/libro/entities/libro.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Autor, Libro])],
  controllers: [AutorController],
  providers: [AutorService],
})
export class AutorModule {}
