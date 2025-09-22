import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";

export const addNote = async (
  userId: string,
  title: string,
  content: string,
  category: string,
  imageUri?: string | null,
  videoUri?: string | null,
  fileUri?: string | null
) => {
  const noteRef = collection(db, "notes");
  const docRef = await addDoc(noteRef, {
    userId,
    title,
    content,
    category,
    imageUri: imageUri || null,
    videoUri: videoUri || null,
    fileUri: fileUri || null,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getNotes = async (userId: string) => {
  const noteRef = collection(db, "notes");
  const q = query(noteRef, where("userId", "==", userId));
  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateNote = async (
  id: string,
  title: string,
  content: string,
  category: string
) => {
  const noteDoc = doc(db, "notes", id);
  await updateDoc(noteDoc, {
    title,
    content,
    category,
  });
};

export const deleteNote = async (id: string) => {
  const noteDoc = doc(db, "notes", id);
  await deleteDoc(noteDoc);
};
