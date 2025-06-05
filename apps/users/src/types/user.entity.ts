import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.role";
@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    @Index()
    username: string;

    @Column({ unique: true })
    @Index()
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ type: 'text', default: UserRole.USER })
    role: UserRole;

}