import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {

  constructor(@InjectRepository(Usuario) private usuarioRepositorio: Repository<Usuario>) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuarioCriado = this.usuarioRepositorio.create(createUsuarioDto);
      return await this.usuarioRepositorio.save(usuarioCriado)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  findAll() {
    return this.usuarioRepositorio.find();
  }

  findOne(id: number) {
    return this.usuarioRepositorio.findOneBy({ id });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Boolean> {
    try {
      const usuarioAtualizado = this.usuarioRepositorio.create(updateUsuarioDto);
      return (await this.usuarioRepositorio.update(id, usuarioAtualizado)).affected > 0
    }
    catch (error) {
      throw new HttpException(error.message, 400)
    }
  }

  async remove(id: number): Promise<Boolean> {
    try {
      return (await this.usuarioRepositorio.delete(id)).affected > 0;
    }
    catch (error) {
      throw new HttpException(error.message, 400)
    }
  }
}
