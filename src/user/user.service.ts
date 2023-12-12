import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateDto, UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDto: UserDto) {
    const user = this.userRepository.create(userDto);
    await this.userRepository.save(user);
    return user;
  }

  async getById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user is not found');
    }
    return user;
  }

  async update(id: number, updateDto: UpdateDto) {
    const user = await this.getById(id);
    const { oldPassword, newPassword } = updateDto;
    const isSame = await user.isPasswordSame(oldPassword);
    if (!isSame) {
      throw new BadRequestException('old password is wrong');
    }
    user.password = newPassword;
    return await this.userRepository.save(user);
  }
}
