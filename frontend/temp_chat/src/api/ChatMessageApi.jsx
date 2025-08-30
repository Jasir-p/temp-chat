import axiosAuthInterceptor from "../interceptors/axiosAuthInterceptor";

export const fetchMessage = async (roomID)=>{
    try{
        const response = await axiosAuthInterceptor.get(`/chat-messages/${roomID}/`)
         return response.data; 
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
    
}
