import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Venue {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Informações principais
    @Column({ length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'integer', nullable: true })
    maxCapacity?: number;

    // Localização
    @Column({ type: 'text' })
    address: string;

    @Column({ length: 100 })
    city: string;

    @Column({ length: 100 })
    state: string;

    @Column({ length: 20 })
    postalCode: string;

    @Column({ length: 100 })
    country: string;

    // Contato
    @Column({ length: 15, nullable: true })
    phone?: string;

    @Column({ length: 100, nullable: true })
    email?: string;

    // Controle
    @Column({ default: true })
    isActive?: boolean;

    //Control
    @Column()
    userId: string

    @Column({type: 'text', nullable: true})
    adminsId?: string[]
}
