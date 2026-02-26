import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { InvitationEntity } from './invitation.entity.js';
import { GuestEntity } from './guest.entity.js';
import { CustomFieldResponseEntity } from './custom-field-response.entity.js';

@Entity('participants')
export class ParticipantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  invitationId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  document: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'jsonb', default: [] })
  shifts: string[];

  @Column({ default: false })
  acceptsImageUsage: boolean;

  @Column({ default: false })
  hasDietaryRestriction: boolean;

  @Column({ type: 'varchar', nullable: true })
  dietaryRestrictionDescription: string | null;

  @Column({ type: 'timestamp', nullable: true })
  checkedInAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => InvitationEntity, (invitation) => invitation.participant)
  @JoinColumn({ name: 'invitationId' })
  invitation: InvitationEntity;

  @OneToMany(() => GuestEntity, (guest) => guest.participant)
  guests: GuestEntity[];

  @OneToMany(() => CustomFieldResponseEntity, (response) => response.participant)
  customFieldResponses: CustomFieldResponseEntity[];
}
