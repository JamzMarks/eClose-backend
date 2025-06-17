import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum EventStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  CANCELLED = "cancelled"
}

export enum EventVisibility {
  PUBLIC = "public",
  PRIVATE = "private",
  UNLISTED = "unlisted"
}

@Entity()
export class Events {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  isOnline: boolean;

  @Column()
  isFree: boolean;

  @Column({ default: true })
  isPublic: boolean;

  @Column({ nullable: true, type: "decimal" })
  ticketPrice: number;

  @Column({ nullable: true })
  ticketLimit: number;

  // @Column({ type: "timestamp" })
  @Column({nullable: true})
  startDate: Date;

  @Column({nullable: true})
  // @Column({ type: "timestamp", nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  bannerUrl: string;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ type: "enum", enum: EventStatus, default: EventStatus.DRAFT })
  status: EventStatus;

  @Column({ type: "enum", enum: EventVisibility, default: EventVisibility.PUBLIC })
  visibility: EventVisibility;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column()
  organizerId: string;

  @Column()
  organizerType: string;

  @Column({ nullable: true, type: "simple-array" })
  admins: string[];
}
