import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Libro } from "src/libro/entities/libro.entity";

@Entity()
export class Prestamo {
     @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fechaPrestamo: Date;

  @Column()
  fechaDevolucion: Date;

  @Column()
  usuarioId: number;

  @Column()
  libroId: number;

  @ManyToOne(() => Usuario, usuario => usuario.prestamos)
  usuario: Usuario;

  @ManyToOne(() => Libro, libro => libro.prestamos)
  libro: Libro;
}
