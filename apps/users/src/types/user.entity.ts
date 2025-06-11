import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.role";
@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ type: 'varchar', default: UserRole.USER })
    role: string;

}