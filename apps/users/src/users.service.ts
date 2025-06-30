import { Injectable } from "@nestjs/common";
import { hashSync } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./types/user.entity";
import { CreateUserDto } from "@app/common/dtos/user/create-user.dto";
import { UserRole } from "./types/user.role";
import { NotFoundRpcException } from "@app/common/exceptions/NotFoundRpcException";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.repo.find({
            skip: 0,
            take: 20,
            order: { username: 'ASC' }
        });
    }

    async findUserById(id: string): Promise<User | null> {
        const user = await this.repo.findOne({ where: { id } });
        // console.log(user)
        if(!user){
            throw new NotFoundRpcException(`User with ID ${id} not found`);
        }
        return user
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.repo.findOne({ where: { email: email.trim().toLowerCase() }});  
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return await this.repo.findOne({ where: { username } });
    }

    async createUser(user: CreateUserDto): Promise<User> {
            const normalizedEmail = user.email.trim().toLowerCase();
            const newUser = this.repo.create({
                ...user,
                email: normalizedEmail,
                password: hashSync(user.password, 10),
                role: UserRole.USER,
            });
        return await this.repo.save(newUser);
    }

    async updateUser(id: string, user: Partial<CreateUserDto>): Promise<User> {
        const existingUser = await this.repo.findOne({ where: { id } });
        if (!existingUser) {
            throw new NotFoundRpcException(`User with ID ${id} not found`);
        }
        const updatedUser = Object.assign(existingUser, user);

        return this.repo.save(updatedUser)
    }

    async deleteUser(id: string): Promise<void> {
        const result = await this.repo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundRpcException(`User with ID: ${id} not found`);
        }
    }

    // THIS METHOD MUST BE RESTRICTED ONLY CAN BE USED BY AUTH SERVICE
    async findUserByEmailWithPassword(email: string): Promise<User | null> {
        return await this.repo.findOne({ where: { email: email.trim().toLowerCase() }, select: ['id', 'email', 'password']});  
    }
}