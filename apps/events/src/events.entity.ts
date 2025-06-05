import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

 @Entity()
 export class Events {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    date: Date;

    @Column()
    location: string;

    @Column({nullable: true})
    description: string;

    @Column()
    organizerId: string;

    @Column()
    organizerType: string;

    @Column({ nullable: true, type: 'text' })
      admins: string[];
 }