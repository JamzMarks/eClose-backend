import { Column, Entity } from "typeorm";

@Entity()
export class User{
    @Column()
    id: string;

    @Column()
    name: string;

    @Column()
    password: string;
    
    @Column()
    email: string;
}