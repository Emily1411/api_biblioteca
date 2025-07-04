import { IsDate, IsDateString, IsInt, IsNumber, IsString } from "class-validator";

export class CreatePrestamoDto {
    @IsInt()
    libroId: number;
    @IsInt()
    usuarioId: number;
    @IsDateString()
    fechaPrestamo: Date;
    @IsDateString()
    fechaDevolucion: Date;
}
