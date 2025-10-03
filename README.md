# 📝 Novi - Smart Notes App

Novi is a React Native mobile application for creating, managing, and organizing notes.  
It supports **text, images, videos, files, and audio notes**, with media uploads powered by **Cloudinary** and secure storage via **Firebase Firestore**.

## 📲 Download APK

You can test the Novi app by downloading the APK:

[📥 Download Novi APK](https://docs.google.com/uc?export=download&id=1O9_H1-zkqf_18JsZom9zI1WwY5vTr24G)

## 🎥 Demo Video

Watch the demo of the Novi app here:  
[▶️ Watch on YouTube]([https://www.youtube.com/watch?v=YOUR_VIDEO_ID](https://youtu.be/3Zwf-lvMht8))

---

## 🚀 Features
- ✍️ Create, edit, and delete notes
- 🗂 Categorize notes (e.g., Work, Personal, Ideas)
- 📸 Attach images, videos, and files
- ☁️ Media uploads handled by Cloudinary
- 🔒 Secure user authentication (Firebase Auth)
- 📑 Notes stored in Firebase Firestore (per-user basis)

---

## 📂 Project Structure
novi/
┣ 📂 src/
┃ ┣ 📂 services/ # Firebase, Cloudinary helpers
┃ ┣ 📂 screens/ # UI pages (Home, NotesPage, etc.)
┃ ┣ 📂 components/ # Reusable UI components
┃ ┣ 📂 types/ # TypeScript interfaces
┃ ┗ App.tsx # Entry point
┣ 📜 package.json
┣ 📜 README.md
┗ ...

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites
- Node.js (>= 18.x)
- npm or yarn
- Expo CLI  
  ```bash
  npm install -g expo-cli
A Firebase project (Firestore + Authentication enabled)

A Cloudinary account with an Unsigned Upload Preset

2️⃣ Clone the Repository
bash
Copy code
git clone https://github.com/your-username/novi.git
cd novi
3️⃣ Install Dependencies
bash
Copy code
npm install
or

bash
Copy code
yarn install
4️⃣ Configure Firebase
Create a file: src/firebase.ts

ts
Copy code
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
5️⃣ Configure Cloudinary
Update your Cloudinary credentials inside src/services/cloudinaryUpload.ts:

ts
Copy code
const CLOUD_NAME = "your_cloud_name";
const UPLOAD_PRESET = "your_unsigned_preset";
6️⃣ Run the App
bash
Copy code
npm start
or

bash
Copy code
yarn start
Then scan the QR code with the Expo Go app (on Android/iOS).

📦 Main Dependencies
React Native

Expo

Firebase

Cloudinary

Axios

React Navigation

🛠 Development Notes
Notes are stored in Firestore under the logged-in user’s userId.

Media files (images/videos/files/audio) are uploaded to Cloudinary and stored in the note document as URLs.

If you plan to add audio recording, you can use expo-av.


