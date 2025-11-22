import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient";
import { FaCamera } from "react-icons/fa";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUser(user);

    // Fetch profile image
    if (user.user_metadata?.avatar_url) {
      setProfileUrl(user.user_metadata.avatar_url);
    }
  };

  const uploadImage = async (e) => {
    try {
      setUploading(true);

      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // 1. Upload image
      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      setProfileUrl(publicUrl);

      // 3. Update user metadata
      await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Upload error:", error.message);
      alert("Failed to upload image!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          My Profile
        </h1>

        {/* Profile Image */}
        <div className="flex justify-center mb-6 relative">
          <img
            src={
              profileUrl ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
          <label
            htmlFor="imageUpload"
            className="absolute bottom-0 right-28 bg-gray-800 p-2 rounded-full cursor-pointer"
          >
            <FaCamera className="text-white text-lg" />
          </label>

          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={uploadImage}
          />
        </div>

        {/* User Info */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {user?.user_metadata?.username || user?.email?.split("@")[0]}
          </h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition">
            Edit Username
          </button>

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/signin";
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
