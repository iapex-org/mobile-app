import { User } from "./User";

export interface ContactRequest {
  interestedPersonName: string;
  missingPersonName: string;
  patient?: number;
  relationship: string;
  phoneNumber?: string;
  email?: string;
  message?: string;
  requestDateTime?: string;
  status?: string;
  attendingUser?: User;
}