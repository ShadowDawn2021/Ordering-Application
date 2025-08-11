import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import EditModal from "../components/EditModal"; // adjust path if needed
import axios from "axios";
import { toast } from "react-toastify";

function Accounts() {
  const { userData, backendUrl, getUserData } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  // Save updated user data to backend
  const handleSave = async (updatedData) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/auth/update`,
        updatedData,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        getUserData(); // refresh context data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Account Information</h2>
      <div>
        <ul>
          <li>First Name: {userData.firstName}</li>
          <li>Last Name: {userData.lastName}</li>
          <li>Address: {userData.address}</li>
          <li>Email: {userData.email}</li>
        </ul>
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      </div>

      {isEditing && (
        <EditModal
          initialData={userData}
          onCancel={() => setIsEditing(false)}
          onSave={(updatedData) => handleSave(updatedData)}
        />
      )}
    </div>
  );
}

export default Accounts;
