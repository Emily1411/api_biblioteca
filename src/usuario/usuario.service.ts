import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(@InjectRepository(Usuario)
private readonly usuarioRepo: Repository<Usuario>
){}

  findAll(): Promise<Usuario[]> {
  return this.usuarioRepo.find();
}


  create(createUsuarioDto: CreateUsuarioDto) {
    const nuevo = this.usuarioRepo.create(createUsuarioDto);
    return this.usuarioRepo.save(nuevo);
  }

   async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOneBy({ id });
    if (!usuario) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return usuario;
  }

  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    const actualizado = Object.assign(usuario, dto);
    return this.usuarioRepo.save(actualizado);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepo.remove(usuario);
  }
}
