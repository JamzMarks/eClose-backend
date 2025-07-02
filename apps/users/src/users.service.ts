import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './types/user.entity';
import { CreateUserDto } from '@app/common/dtos/user/create-user.dto';
import { UserRole } from './types/user.role';
import { NotFoundRpcException } from '@app/common/exceptions/NotFoundRpcException';
import { KafkaProducerService } from './services/KafkaProducer.service';
import { EmptyUserDto } from './dto/emptyUser.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly kafka: KafkaProducerService,
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  // async findAll(): Promise<User[]> {
  //   return await this.repo.find({
  //     skip: 0,
  //     take: 20,
  //     order: { username: 'ASC' },
  //   });
  // }

  async findUserById(userId: string): Promise<User | null> {
    const user = await this.repo.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundRpcException(`User with ID ${userId} not found`);
    }
    return user;
  }

  // async findUserByEmail(email: string): Promise<User | null> {
  //   return await this.repo.findOne({
  //     where: { email: email.trim().toLowerCase() },
  //   });
  // }

  // async findUserByUsername(username: string): Promise<User | null> {
  //   return await this.repo.findOne({ where: { username } });
  // }

  async createUser(user: any): Promise<any> {
    console.log('Creating user: fui chamado', user);
    // const newUser = this.repo.create({
    //   ...user,
    // });
    // return await this.repo.save(newUser);
  }

  async updateUser(id: string, user: Partial<CreateUserDto>): Promise<User> {
    const existingUser = await this.repo.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundRpcException(`User with ID ${id} not found`);
    }
    const updatedUser = Object.assign(existingUser, user);

    return this.repo.save(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundRpcException(`User with ID: ${id} not found`);
    }
  }
  
  async createEmptyProfile(user: EmptyUserDto): Promise<any> {
    console.log('Creating empty user profile:', user);
    const newUser = this.repo.create({
      userId: user.id,
      username: user.username,
    });
    return await this.repo.save(newUser);
  }

  async checkHelth(): Promise<string> {
    await this.kafka.emit('usersHealth_checked', {
      timestamp: new Date().toISOString(),
      service: 'auth',
      status: 'ok',
    });

    return 'User MS is running';
  }
}
