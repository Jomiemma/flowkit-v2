import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import InputField from "../../components/Reusables/inputFields";
import { userAPI, getUser, authAPI } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    staffId: "",
    email: "",
    department: "",
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentUser = getUser();
    if (currentUser) {
      setProfile({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        staffId: currentUser.staffId || "",
        email: currentUser.email || "",
        department: currentUser.department || "",
        signature: currentUser.signature || "",
      });
    }
  }, []); // Empty dependency array - only run once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignatureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        
        // Update UI immediately
        setProfile((prev) => ({ ...prev, signature: base64String }));

        // Upload to backend
        try {
          const response = await userAPI.uploadSignature(base64String);
          if (response.success) {
            toast.success("Signature uploaded successfully!");
            
            // Update local storage
            const currentUser = getUser();
            const updatedUser = { ...currentUser, signature: base64String };
            localStorage.setItem('user', JSON.stringify(updatedUser));
          }
        } catch (error) {
          toast.error(error.message || "Failed to upload signature");
          // Revert UI on error
          setProfile((prev) => ({ ...prev, signature: currentUser?.signature || "" }));
        }
      };
      
      reader.onerror = () => {
        toast.error("Failed to read file");
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to process image");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await userAPI.updateProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        staffId: profile.staffId,
      });

      if (response.success) {
        toast.success("Profile updated successfully!");
        
        // Update local storage
        const currentUser = getUser();
        const updatedUser = { ...currentUser, ...profile };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Clear all auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Navigate to login using React Router
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-10 px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6 border-b pb-3">
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Editable Profile Info */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <InputField
                label="First Name"
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <InputField
                label="Last Name"
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <InputField
                label="Staff ID"
                type="text"
                name="staffId"
                value={profile.staffId}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div>
              <InputField
                label="Email"
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <p className="text-sm text-gray-500 mb-1">Department</p>
              <p className="font-medium text-gray-800 bg-gray-50 px-4 py-2 rounded-lg border">
                {profile.department}
              </p>
            </div>
            
            <div className="col-span-2">
              <p className="text-sm text-gray-500 mb-1">Role</p>
              <p className="font-medium text-gray-800 bg-gray-50 px-4 py-2 rounded-lg border capitalize">
                {getUser()?.role || 'Employee'}
              </p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="mt-8">
            <p className="text-lg font-medium mb-2">Signature</p>
            {profile.signature ? (
              <img
                src={profile.signature}
                alt="Employee Signature"
                className="w-40 h-20 border rounded-md object-contain mb-3"
              />
            ) : (
              <p className="text-gray-500 italic mb-3">
                No signature uploaded yet
              </p>
            )}
            <label className="flex items-center gap-2 text-blue-600 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Upload new signature</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleSignatureChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Save Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
