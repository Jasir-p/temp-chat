import axios from "axios";
export const Logout = async()=>{
    try{
        const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/user/logout/`,{},
                { withCredentials: true }
                );

        return true
    }catch(error){
        return false
    }
}