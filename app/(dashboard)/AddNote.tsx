import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth } from "@/firebase";
import { addNote } from "@/services/noteService";

const AddNote = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<Blob | null>(null);
  const [previewUri, setPreviewUri] = useState<string>("");

  // Pick image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPreviewUri(uri);

      // fetch blob
      const response = await fetch(uri);
      const blob = await response.blob();
      setImage(blob);
    }
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;

    await addNote(
      {
        userId: auth.currentUser.uid,
        title,
        content,
      },
      image || undefined
    );

    // Clear form
    setTitle("");
    setContent("");
    setImage(null);
    setPreviewUri("");

    // Navigate back to Profile
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Add New Note
      </Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
          height: 100,
        }}
      />

      {previewUri ? (
        <Image
          source={{ uri: previewUri }}
          style={{ width: 150, height: 150, borderRadius: 10, marginBottom: 10 }}
        />
      ) : null}

      <TouchableOpacity
        onPress={pickImage}
        style={{
          backgroundColor: "#6c5ce7",
          padding: 12,
          borderRadius: 8,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Pick Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: "#00b894",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          Save Note
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNote;
