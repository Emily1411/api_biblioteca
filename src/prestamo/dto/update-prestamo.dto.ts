import { PartialType } from '@nestjs/mapped-types';
import { CreatePrestamoDto } from './create-prestamo.dto';
import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class UpdatePrestamoDto {
   @IsOptional()
    @IsInt()
    usuarioId?: number;

    @IsOptional()
    @IsInt()
    libroId?: number;

    @IsOptional()
    @IsDateString()
    fechaPrestamo?: string;

    @IsOptional()
    @IsDateString()
    fechaDevolucion?: string;
}
