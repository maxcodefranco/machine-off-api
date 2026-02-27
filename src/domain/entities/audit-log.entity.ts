import { AuditLogType } from '../enums/audit-log-type.enum.js';

export interface AuditLog {
  id: string;
  type: AuditLogType;
  metadata: Record<string, unknown>;
  createdAt: Date;
}
