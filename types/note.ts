// export interface Note {
//   id?: string;
//   userId: string;          // Owner's UID
//   title: string;
//   content: string;
//   category?: string;
//   imageUrl?: string;
//   important?: boolean;
//   reminderTime?: string;   // e.g., "2025-09-07T10:00"
//   createdAt?: Date;
// }
export interface Note {
  id: string;
  title: string;
  content: string;
  imageURL?: string;
  imageURI?: string; // Local image URI before upload
  important: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  tags?: string[];
  category?: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  imageURI?: string;
  important?: boolean;
  tags?: string[];
  category?: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  imageURL?: string;
  imageURI?: string;
  important?: boolean;
  tags?: string[];
  category?: string;
}