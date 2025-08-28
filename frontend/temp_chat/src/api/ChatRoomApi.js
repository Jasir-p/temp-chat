import axiosAuthInterceptor from "../interceptors/axiosAuthInterceptor"

export const fetchChatRooms = async (params={})=>{
    try{
        const response = await axiosAuthInterceptor.get("/chat-rooms/",{params})
        return response
    }catch(error){
        return error
    }
}