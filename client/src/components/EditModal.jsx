import { useState } from "react";

function EditModal({ initialData, onCancel, onSave }) {
  const [data, setData] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    address: initialData.address || "",
    email: initialData.email || "",
  });

  const handleChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded shadow w-[90%] max-w-md">
          <h3 className="text-lg font-semibold mb-2">Edit your profile</h3>
          <input
            value={data.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />
          <input
            value={data.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

          <input
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

          <input
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

          <div className="flex justify-end gap-2">
            <button onClick={onCancel} className="text-gray-500">
              Cancel
            </button>
            <button
              onClick={() => onSave(data)}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditModal;
