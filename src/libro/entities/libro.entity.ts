import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Autor } from '../../autor/entities/autor.entity';
import { Prestamo } from "src/prestamo/entities/prestamo.entity";

@Entity()
export class Libro {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    titulo: string;
    @ManyToOne(() => Autor, (autor) => autor.libros)
    autor: Autor;
    @Column()
    isbn: string;
    @OneToMany(() => Prestamo, (prestamo) => prestamo.usuario)
    prestamos: Prestamo[];
}
