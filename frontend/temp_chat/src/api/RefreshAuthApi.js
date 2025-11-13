import axios from "axios";

export const RefreshAuth= async()=>{

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/token/refresh/`,{},
        {withCredentials:true,

        }
    )
    return response    
}