import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { addNote } from "../../services/noteService";

export default function SimpleNotes() {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("📝");

  const categories = ["📝", "💼", "📚", "💡", "⭐"]; // Personal, Work, Study, Ideas, Other

  const handleSave = async () => {
    if (!title || !content || !user?.uid) return;

    try {
      await addNote(user.uid, title, content, category);
      setTitle("");
      setContent("");
      setCategory("📝");
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🌸 Your Notes</Text>

      {/* Category Selector */}
      <View style={styles.categories}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryBtn,
              category === cat && styles.categoryBtnActive,
            ]}
            onPress={() => setCategory(cat)}
          >
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Note Inputs */}
      <View style={styles.inputCard}>
        <TextInput
          placeholder="Title"
          placeholderTextColor="#aaa"
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
        />
        <TextInput
          placeholder="Write something..."
          placeholderTextColor="#aaa"
          value={content}
          onChangeText={setContent}
          style={styles.contentInput}
          multiline
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveBtn, (!title || !content) && styles.saveBtnDisabled]}
        onPress={handleSave}
        disabled={!title || !content}
      >
        <Feather name="plus-circle" size={20} color="#fff" />
        <Text style={styles.saveBtnText}>Add Note</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF0F5",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FF6B8B",
    marginBottom: 20,
  },
  categories: {
    flexDirection: "row",
    marginBottom: 20,
  },
  categoryBtn: {
    padding: 12,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: "#FFE6EC",
  },
  categoryBtnActive: {
    backgroundColor: "#FF6B8B",
  },
  categoryText: {
    fontSize: 18,
    color: "#FF6B8B",
  },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#FF6B8B",
  },
  contentInput: {
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
    color: "#FF6B8B",
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
    borderRadius: 25,
    backgroundColor: "#FF6B8B",
  },
  saveBtnDisabled: {
    backgroundColor: "#FFB6C1",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
