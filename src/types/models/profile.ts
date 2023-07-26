import { StaffRole } from './staff';

export interface Profile {
  username?: string;
  fullname?: string;
  Role?: StaffRole;
  image?: string;
}
