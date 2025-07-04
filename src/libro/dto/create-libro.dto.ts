import { IsNotEmpty, IsString } from 'class-validator';
export class CreateLibroDto {
    @IsString()
    titulo: string;

    @IsNotEmpty()
    autorId: number;

    @IsString()
    isbn: string;
}