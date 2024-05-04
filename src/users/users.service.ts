import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    @InjectRepository(User)
    private readonly userRepository: Repository<User>


  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    })
    if(!user){
      throw new HttpException(`User ID ${id} not found`, HttpStatus.NOT_FOUND)
    }
    return user
  }

  async create(createUserDTO: CreateUserDTO) {
    const user = this.userRepository.create({
      ...createUserDTO,
    });
    return this.userRepository.save(user)
  }

  async update(id: string, updateUserDTO: UpdateUserDTO) {

    const user = await this.userRepository.preload({
      ...updateUserDTO,
      id,
    });
    if (!user){
      throw new NotFoundException(`User ID ${id} not found`)
    }
    return this.userRepository.save(user)
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    })
    if(!user) {
      throw new NotFoundException(`User ID ${id} not found`)
    }
    return this.userRepository.remove(user)
  }

  async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email, password } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

}
