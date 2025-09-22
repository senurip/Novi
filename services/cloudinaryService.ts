import axios from "axios";

const CLOUD_NAME = "notezycloud"; 
const UPLOAD_PRESET = "novi_preset"; 


export const uploadToCloudinary = async (
  fileUri: string, 
  fileType: "image" | "video" | "file"
) => {
  try {
    const formData = new FormData();

    let uri = fileUri;
    // On Android, strip 'file://'
    if (uri.startsWith("file://")) uri = uri.substring(7);

    formData.append("file", {
      uri: fileUri, // keep original URI
      type:
        fileType === "image"
          ? "image/jpeg"
          : fileType === "video"
          ? "video/mp4"
          : "application/octet-stream",
      name: fileUri.split("/").pop() || "file",
    } as any);

    formData.append("upload_preset", UPLOAD_PRESET);

     //  Use 'raw' for generic files
    const resourceType =
      fileType === "file" ? "raw" : fileType;

    const response = await axios.post(
      //`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${fileType === "file" ? "raw" : fileType}/upload`,

      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("Cloudinary URL:", response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};


  
//npm install axios
// use Axios to send files to Cloudinary.