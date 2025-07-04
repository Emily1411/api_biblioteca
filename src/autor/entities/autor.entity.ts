import { Libro } from "src/libro/entities/libro.entity";
import { Column,  Entity,  OneToMany , PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Autor {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @OneToMany(() => Libro, (libro) => libro.autor)
    libros: Libro[];
}