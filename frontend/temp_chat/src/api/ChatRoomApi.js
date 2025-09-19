import axiosAuthInterceptor from "../interceptors/axiosAuthInterceptor"

export const fetchChatRooms = async (url = "/api/chat-rooms/",params={})=>{
    try{
        const response = await axiosAuthInterceptor.get(url,{params})
        return response.data
    }catch(error){
        return error
    }
}

export const getSingleChatRoom =  async (roomID) =>{
    try{
        const response = await axiosAuthInterceptor.get(`/api/get-chat-room/${roomID}/`)
        return response.data
    }catch(error){
        return error
    }
}


export const addChatRoom = async (formData) => {
  const response = await axiosAuthInterceptor.post('/api/chat-rooms/', formData);
  return response.data;
};

export const removeChatRoom = async(roomID)=>{
    const response =  await axiosAuthInterceptor.delete(`/api/chat-rooms/${roomID}/delete/`)
    console.log(response);
    
    return response
}
