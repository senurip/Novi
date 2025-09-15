import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

const Home = () => {
  return (
    <View className="flex-1 bg-gray-100 justify-center items-center px-6">
      {/* Title */}
      <Text className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Novi 📒
      </Text>

      {/* Subtitle */}
      <Text className="text-lg text-gray-600 mb-8 text-center">
        Your personal note app — create, organize, and never forget!
      </Text>

      {/* Example Button */}
      <TouchableOpacity className="bg-blue-600 rounded-2xl px-6 py-3 shadow-md active:bg-blue-700">
        <Text className="text-white text-lg font-semibold">Create a Note</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home
