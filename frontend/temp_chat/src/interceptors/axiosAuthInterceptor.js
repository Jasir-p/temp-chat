import axios from "axios";

const axiosAuthInterceptor = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true
})


axiosAuthInterceptor.interceptors.response.use(
    (response)=> response,
    async(error) =>{
        const originalRequest = error.config
        
        if (
            error.response.status === 401 &&
            !originalRequest._retry
        ){
            originalRequest._retry = true
            try{
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/user/token/refresh/`,
          {},
          { withCredentials: true }
        );
        return axiosAuthInterceptor(originalRequest)
            }
            catch(refreshError){
                console.log("logout");
                
            }
        }
        return Promise.reject(error)
    }
)

export default axiosAuthInterceptor