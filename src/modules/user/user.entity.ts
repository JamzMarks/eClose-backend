import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    @Index()
    username: string;

    @Column({ unique: true })
    @Index()
    email: string;

    @Column({ select: false })
    password: string;

}