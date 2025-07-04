import { Module } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoController } from './prestamo.controller';
import { Libro } from 'src/libro/entities/libro.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Prestamo } from './entities/prestamo.entity';

@Module({
   imports: [
    TypeOrmModule.forFeature([Prestamo, Usuario, Libro])
  ],
  controllers: [PrestamoController],
  providers: [PrestamoService],
})
export class PrestamoModule {}
