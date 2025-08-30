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