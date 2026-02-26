import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ParticipantEntity } from './participant.entity.js';
import { CustomFieldEntity } from './custom-field.entity.js';

@Entity('custom_field_responses')
export class CustomFieldResponseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  participantId: string;

  @Column()
  customFieldId: string;

  @Column({ type: 'text' })
  value: string;

  @ManyToOne(() => ParticipantEntity, (participant) => participant.customFieldResponses)
  @JoinColumn({ name: 'participantId' })
  participant: ParticipantEntity;

  @ManyToOne(() => CustomFieldEntity, (field) => field.responses)
  @JoinColumn({ name: 'customFieldId' })
  customField: CustomFieldEntity;
}
