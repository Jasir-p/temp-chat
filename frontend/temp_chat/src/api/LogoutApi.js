import axios from "axios";
export const Logout = async()=>{
    try{
        const response = await axios.post(
                "http://localhost:8000/api/user/logout/",{},
                { withCredentials: true }
                );

        return true
    }catch(error){
        return false
    }
}