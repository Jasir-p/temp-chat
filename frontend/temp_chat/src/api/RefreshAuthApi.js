import axios from "axios";

export const RefreshAuth= async()=>{

      const response = await axios.post("http://localhost:8000/api/user/token/refresh/",{},
        {withCredentials:true,

        }
    )
    return response    
}