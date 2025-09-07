import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Note } from "../types/note";

// Notes collection
const notesCollection = collection(db, "notes");

// Add new note
export const addNote = async (note: Note, imageFile?: Blob) => {
  let imageUrl = "";

  if (imageFile) {
    const storageRef = ref(storage, `notes/${Date.now()}-${note.userId}`);
    await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(storageRef);
  }

  const docRef = await addDoc(notesCollection, {
    ...note,
    imageUrl,
    createdAt: new Date(),
  });

  return docRef.id;
};

// Get notes by user
export const getNotesByUser = async (userId: string): Promise<Note[]> => {
  const q = query(notesCollection, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Note[];
};

// Update note
export const updateNote = async (id: string, data: Partial<Note>) => {
  await updateDoc(doc(db, "notes", id), data);
};

// Delete note
export const deleteNote = async (id: string) => {
  await deleteDoc(doc(db, "notes", id));
};
