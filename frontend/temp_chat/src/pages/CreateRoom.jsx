import React, { useState } from 'react'
import { Input } from '../components/FormInput'
import { Button } from '../components/FormButton'
import { addChatRoom } from '../api/ChatRoomApi'
import { showError,showSuccess } from '../utils/toast'

const CreateRoom = ({ onClose,onChange }) => {

const [formData,setFormData] = useState({
    name:'',
    description:''
})

const handleChanges = (e)=>{
  setFormData({
    ...formData,
    [e.target.name]:e.target.value
  })
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await addChatRoom(formData);
    console.log("Room created:", data);
    showSuccess("Room created successfully!");
    onChange()
    onClose(); 
  } catch (error) {
    console.error("Failed to create room:", error);
const backendError = error.response?.data?.error?.name?.[0] || // specific field
      error.response?.data?.error ||            // generic error object
      "Failed to create room";
    showError(backendError);
  }
};


  return (
    <div className="fixed inset-0 bg-opacity-50 flex  items-center justify-center shadow-2xs z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create a New Room</h2>
        <Input
            label="name"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChanges}
            placeholder="Enter Room Name"
        />
        <Input
            label="description"
            type="textarea"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChanges}
            placeholder="Enter Description"
        />
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            onClick={onClose}
            variant='danger'
            size='sm'
            className='w-1/2'
          >
            Cancel
          </Button>
          <Button
          onClick={handleSubmit}
            variant='primary'
            size='sm'
            className='w-1/2'
        >Create</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom
