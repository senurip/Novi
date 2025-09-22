import { Ionicons, Feather } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { addNote, deleteNote, getNotes, updateNote } from "../../services/noteService";

export default function ProfilePage() {
  const { user, logoutUser } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [notes, setNotes] = useState<any[]>([]);

  // For editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const categories = ["Personal", "Work", "Study", "Ideas", "Other"];
  const categoryColors: { [key: string]: string } = {
    Personal: "#FFB6C1",
    Work: "#87CEFA",
    Study: "#FFD700",
    Ideas: "#90EE90",
    Other: "#D3D3D3",
  };

  // Load notes
  const loadNotes = async () => {
    if (!user?.uid) return;
    const data = await getNotes(user.uid);
    setNotes(data);
  };

  useEffect(() => {
    loadNotes();
  }, [user]);

  // Edit handlers
  const handleEdit = (note: any) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editTitle || !editContent) return;
    const note = notes.find((n) => n.id === id);
    await updateNote(id, editTitle, editContent, note?.category || "Other");
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
    loadNotes();
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await deleteNote(id);
          loadNotes();
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile header */}
      <View style={styles.header}>
        <Text style={styles.title}>👤 Profile</Text>
        <TouchableOpacity onPress={logoutUser}>
          <Ionicons name="log-out-outline" size={28} color="#FF6B8B" />
        </TouchableOpacity>
      </View>

      {image ? (
        <Image source={{ uri: image }} style={styles.profileImage} />
      ) : (
        <Text style={styles.subtitle}>No profile picture selected</Text>
      )}

      {/* Notes */}
      <Text style={styles.notesTitle}>📝 Your Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.noteCard, { backgroundColor: categoryColors[item.category] || "#FFF" }]}>
            {editingId === item.id ? (
              <>
                <TextInput style={styles.input} value={editTitle} onChangeText={setEditTitle} />
                <TextInput
                  style={[styles.input, { height: 60 }]}
                  value={editContent}
                  onChangeText={setEditContent}
                  multiline
                />
                <View style={{ flexDirection: "row", gap: 16 }}>
                  <TouchableOpacity onPress={() => handleSaveEdit(item.id)}>
                    <Text style={{ color: "#FF6B8B", fontWeight: "700" }}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEditingId(null)}>
                    <Text style={{ color: "#FF6B8B", fontWeight: "700" }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View style={styles.noteHeader}>
                  <Text style={styles.noteTitle}>{item.title}</Text>
                  <Text style={styles.noteCategory}>{item.category}</Text>
                </View>
                <Text style={styles.noteContent}>{item.content}</Text>

                {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.mediaPreview} />}
                {item.videoUri && (
                  <Video source={{ uri: item.videoUri }} style={styles.mediaPreview} useNativeControls resizeMode={ResizeMode.CONTAIN} />
                )}
                {item.fileUri && <Text style={{ marginTop: 8 }}>📄 {item.fileUri.split("/").pop()}</Text>}

                <View style={styles.noteActions}>
                  <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionButton}>
                    <Feather name="edit-2" size={16} color="#FF6B8B" />
                    <Text>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
                    <Feather name="trash-2" size={16} color="#FF6B8B" />
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No notes yet</Text>}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#FFECF1" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "700", color: "#FF6B8B" },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },
  profileImage: { width: 150, height: 150, borderRadius: 75, marginBottom: 20 },
  notesTitle: { fontSize: 20, fontWeight: "700", marginBottom: 8, color: "#FF6B8B" },
  noteCard: { padding: 12, borderRadius: 16, marginBottom: 12 },
  noteHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  noteTitle: { fontWeight: "700", fontSize: 16, color: "#FF6B8B" },
  noteCategory: { fontSize: 12, color: "#FF6B8B", fontStyle: "italic" },
  noteContent: { fontSize: 14, color: "#FF6B8B" },
  noteActions: { flexDirection: "row", marginTop: 8, gap: 12 },
  actionButton: { flexDirection: "row", alignItems: "center", gap: 4 },
  mediaPreview: { width: "100%", height: 200, borderRadius: 12, marginTop: 8 },
  input: { backgroundColor: "#FFF", padding: 8, borderRadius: 12, marginBottom: 8, color: "#FF6B8B" },
  emptyText: { textAlign: "center", marginTop: 20, color: "#FF6B8B" },
});
