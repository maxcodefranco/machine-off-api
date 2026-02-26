import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { InvitationEntity } from './invitation.entity.js';
import { CustomFieldEntity } from './custom-field.entity.js';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date | null;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column({ type: 'text' })
  orientacoes: string;

  @Column({ type: 'timestamp', nullable: true })
  deadline: Date | null;

  @Column({ type: 'varchar', default: 'fixed' })
  pricingType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pricingValue: number | null;

  @Column({ type: 'jsonb', default: {} })
  links: Record<string, string>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => InvitationEntity, (invitation) => invitation.event)
  invitations: InvitationEntity[];

  @OneToMany(() => CustomFieldEntity, (field) => field.event)
  customFields: CustomFieldEntity[];
}
