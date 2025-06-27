import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Prestamo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    fechaPrestamo: Date;
    @Column()
    fechaDevolucion: Date;
    @ManyToOne(() => Usuario, (usuario) => usuario.prestamos)
    usuarioId: number;
    @ManyToOne(() => Libro, (libro) => libro.prestamos)
    libroId: number;
}
