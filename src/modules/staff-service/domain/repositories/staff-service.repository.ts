import type { NewStaffService } from '@/modules/staff-service/domain/entities/new-staff-service';
import { StaffService } from '@/modules/staff-service/domain/entities/staff-service.entity';

export interface StaffServiceRepository {
  create(staffService: NewStaffService): Promise<StaffService>;
  findById(id: number): Promise<StaffService | null>;
  findAll(): Promise<StaffService[]>;
  deleteById(id: number): Promise<StaffService | null>;
}

export const STAFF_SERVICE_REPOSITORY = 'STAFF_SERVICE_REPOSITORY';
