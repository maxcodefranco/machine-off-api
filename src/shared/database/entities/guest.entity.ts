import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ParticipantEntity } from './participant.entity.js';

@Entity('guests')
export class GuestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  participantId: string;

  @Column()
  name: string;

  @Column({ default: false })
  isChild: boolean;

  @Column({ nullable: true, type: 'int' })
  age: number | null;

  @Column({ default: false })
  hasDietaryRestriction: boolean;

  @Column({ type: 'varchar', nullable: true })
  dietaryRestrictionDescription: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ParticipantEntity, (participant) => participant.guests)
  @JoinColumn({ name: 'participantId' })
  participant: ParticipantEntity;
}
