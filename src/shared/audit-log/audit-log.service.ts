import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLogEntity } from '../database/entities/audit-log.entity.js';
import { AuditLogType } from '../../domain/enums/audit-log-type.enum.js';

export interface AuditLogInput {
  type: AuditLogType;
  metadata?: Record<string, unknown>;
}

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLogEntity)
    private readonly auditLogRepository: Repository<AuditLogEntity>,
  ) {}

  async log(input: AuditLogInput): Promise<void> {
    const entity = this.auditLogRepository.create({
      type: input.type,
      metadata: input.metadata ?? {},
    });
    await this.auditLogRepository.save(entity);
  }
}
