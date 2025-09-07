import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { auth } from "@/firebase";
import { getNotesByUser, deleteNote } from "@/services/noteService";
import { Note } from "@/types/note";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const userId = auth.currentUser?.uid || "";
  const navigation = useNavigation<any>();

  const loadNotes = async () => {
    if (!userId) return;
    setLoading(true);
    const data = await getNotesByUser(userId);
    setNotes(data);
    setLoading(false);
  };

  const removeNote = async (id: string) => {
    await deleteNote(id);
    loadNotes();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotes(); // reload notes when screen focused
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 15, backgroundColor: "#f8f9fa" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
        My Notes
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0984e3" />
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "white",
                padding: 15,
                borderRadius: 12,
                marginBottom: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.title}
                </Text>
                <Text numberOfLines={2} style={{ color: "#666" }}>
                  {item.content}
                </Text>
                {item.imageUrl && (
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                      width: 80,
                      height: 80,
                      marginTop: 5,
                      borderRadius: 8,
                    }}
                  />
                )}
              </View>

              <TouchableOpacity onPress={() => removeNote(item.id!)}>
                <MaterialIcons name="delete" size={24} color="#FF4757" />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
              No notes yet. Tap + to add one!
            </Text>
          )}
        />
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("AddNote")}
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          backgroundColor: "#0984e3",
          padding: 18,
          borderRadius: 50,
          elevation: 5,
        }}
      >
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
