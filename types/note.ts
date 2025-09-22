// // export interface Note {
// //   id?: string;
// //   userId: string;          // Owner's UID
// //   title: string;
// //   content: string;
// //   category?: string;
// //   imageUrl?: string;
// //   important?: boolean;
// //   reminderTime?: string;   // e.g., "2025-09-07T10:00"
// //   createdAt?: Date;
// // }


// export interface Note {
//   id: string;
//   title: string;
//   content: string;
//   category: string;
  
//   // Store URLs (or null if not uploaded)
//   //file?: string | null;
//   audio?: string | null;

//   imageUrl?: string | null;
//   videoUrl?: string | null;
//   fileUrl?: string | null;
  
  
//   createdAt?: { seconds: number; nanoseconds?: number } | Date;
// }


export interface Note {
  id: string;
  userId: string;   // who owns the note
  title: string;
  content: string;
  category: string;

  imageUri?: string | null;  // 🔑 store local/file/URI string
  videoUri?: string | null;
  fileUri?: string | null;

  createdAt?: { seconds: number; nanoseconds?: number } | Date;
}
