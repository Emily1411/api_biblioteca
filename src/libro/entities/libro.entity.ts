import { Column, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Autor } from '../../autor/entities/autor.entity';


export class Libro {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    titulo: string;
    @ManyToOne(() => Autor, (autor) => autor.libros)
    autor: Autor;
    @Column()
    isbn: string;
}
