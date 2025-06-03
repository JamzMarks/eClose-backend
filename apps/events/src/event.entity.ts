import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

 @Entity()
 export class Event {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    date: Date;

    @Column()
    location: string;

    @Column()
    description: string;

    @Column()
    organizer: string;
 }