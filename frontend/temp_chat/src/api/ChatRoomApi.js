import axiosAuthInterceptor from "../interceptors/axiosAuthInterceptor"

export const fetchChatRooms = async (params={})=>{
    try{
        const response = await axiosAuthInterceptor.get("/chat-rooms/",{params})
        return response
    }catch(error){
        return error
    }
}

export const getSingleChatRoom =  async (roomID) =>{
    try{
        const response = await axiosAuthInterceptor.get(`/get-chat-room/${roomID}/`)
        return response.data
    }catch(error){
        return error
    }
}


export const addChatRoom = async (formData) => {
  const response = await axiosAuthInterceptor.post('/chat-rooms/', formData);
  return response.data;
};

export const removeChatRoom = async(roomID)=>{
    const response =  await axiosAuthInterceptor.delete(`/chat-rooms/${roomID}/delete/`)
    console.log(response);
    
    return response
}
