import { User } from "./user.model";

export interface EventModel {
  eventId?: number;
  title: string;
  description?: string;
  dueDate: string;
  dueTime: string;
  users: number[]
}
