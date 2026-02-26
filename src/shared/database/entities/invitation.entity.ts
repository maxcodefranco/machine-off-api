import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { EventEntity } from './event.entity.js';
import { ParticipantEntity } from './participant.entity.js';

@Entity('invitations')
export class InvitationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventId: string;

  @Column({ unique: true })
  code: string;

  @Column()
  guestName: string;

  @Column({ type: 'varchar', nullable: true })
  guestPhone: string | null;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => EventEntity, (event) => event.invitations)
  @JoinColumn({ name: 'eventId' })
  event: EventEntity;

  @OneToOne(() => ParticipantEntity, (participant) => participant.invitation)
  participant: ParticipantEntity;
}
