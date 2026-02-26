import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { EventEntity } from './event.entity.js';
import { CustomFieldResponseEntity } from './custom-field-response.entity.js';

@Entity('custom_fields')
export class CustomFieldEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventId: string;

  @Column()
  key: string;

  @Column()
  label: string;

  @Column()
  type: string;

  @Column({ default: false })
  required: boolean;

  @Column({ type: 'jsonb', nullable: true })
  options: string[] | null;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => EventEntity, (event) => event.customFields)
  @JoinColumn({ name: 'eventId' })
  event: EventEntity;

  @OneToMany(() => CustomFieldResponseEntity, (response) => response.customField)
  responses: CustomFieldResponseEntity[];
}
