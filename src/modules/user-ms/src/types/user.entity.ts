import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
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

}