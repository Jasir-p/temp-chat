import axios from "axios";
import axiosAuthInterceptor from "../interceptors/axiosAuthInterceptor";

export const ProtectRouteApi = async()=>{

      const response = await axiosAuthInterceptor.get("/user/profile/",
    )
    return response    
}