export interface Note {
  id?: string;
  userId: string;          // Owner's UID
  title: string;
  content: string;
  category?: string;
  imageUrl?: string;
  important?: boolean;
  reminderTime?: string;   // e.g., "2025-09-07T10:00"
  createdAt?: Date;
}
