import { Prestamo } from "src/prestamo/entities/prestamo.entity";
import { Column, PrimaryGeneratedColumn,Entity, OneToMany } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    email: string;
    @OneToMany(() => Prestamo, (prestamo) => prestamo.usuario)
    prestamos: Prestamo[];
}
    
