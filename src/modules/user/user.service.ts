import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";
import { CreateUserDto, UserDto } from "./user.dto";
import { hashSync } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.repo.find();
    }

    async findUserById(id: string): Promise<User | null> {
        return await this.repo.findOne({ where: { id } });
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.repo.findOne({ where: { email }});  
    }

    async createUser(user: CreateUserDto): Promise<User> {
         const newUser = this.repo.create({
            name: user.name,
            email: user.email,
            password: hashSync(user.password, 10),
        });
        return await this.repo.save(newUser);
    }

    async updateUser(id: string, user: Partial<CreateUserDto>): Promise<User> {
        const existingUser = await this.repo.findOne({ where: { id } });
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        const updatedUser = Object.assign(existingUser, user);

        return this.repo.save(updatedUser)
    }

    async deleteUser(id: string): Promise<void> {
        const result = await this.repo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID: ${id} not found`);
        }
    }
}