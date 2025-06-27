import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    email: string;
}
    
