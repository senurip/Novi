import { MaterialIcons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import React from "react"

const tabs = [
  { label: "Home", name: "home", icon: "home-filled" },
  
  { label: "Profile", name: "profile", icon: "person" },
  { label: "Settings", name: "settings", icon: "settings" }
] as const

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
      }}
    >
      {/* (obj.name) ===  ({name}) */}
      {tabs.map(({ name, icon, label }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: label,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={icon} color={color} size={size} />
            )
          }}
        />
      ))}
    </Tabs>
  )
}

// tasks/index

export default DashboardLayout
