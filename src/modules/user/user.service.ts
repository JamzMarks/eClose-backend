import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { CreateUserDto, UserDto } from "./user.dto";
import { v4 as uuid } from 'uuid';
import { hashSync } from "bcrypt";

const users: User[] = [
    { id: '1', name: 'John Doe', email: "teste1", password: 'aaaaaabb' },
    { id: '2', name: 'Jane Smith', email: "teste2", password: 'aaaaaabb' },
    { id: '3', name: 'Alice Johnson', email: "teste3", password: 'aaaaaabb' }  
]

@Injectable()
export class UserService {
    getUsers(): User[] {
        return users;
    }

    getUserById(id: string): User | null {
        const user = users.find(user => user.id === id);
        return user ? user : null;
    }

    findUserByEmail(email: string): User | null {
        const user = users.find(user => user.email === email);
        return user ? user : null;
    }

    createUser(user: CreateUserDto): UserDto {
        const newUser: User = {
            id: uuid(),
            name: user.name,
            email: user.email,
            password: hashSync(user.password, 10)
        }
        users.push(newUser)

        return newUser;
    }

    updateUser(id: string, name: string): string {
        return `User with ID: ${id} updated to ${name}`;
    }

    deleteUser(id: string): string {
        return `User with ID: ${id} deleted`;
    }
}