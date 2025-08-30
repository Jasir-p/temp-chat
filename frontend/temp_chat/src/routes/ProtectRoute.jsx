import React,{useEffect, useState} from 'react'
import { ProtectRouteApi } from '../api/ProtectRouteApi'
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setUserProfile,clearAuth } from '../redux/slice/UserProfileSlice';

const ProtectRoute = ({children}) => {
    const [loading,setLoading]=useState(true)
    const [authenticated,setAuthenticated] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    
useEffect(() => {
  const checkAuth = async () => {
    try {
      const response =await ProtectRouteApi();
      console.log(response);
      
      dispatch(setUserProfile({
        userId:response.id,
        username:response.username

    }))

      setAuthenticated(true);   
    } catch (error) {
      setAuthenticated(false);  
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);

     useEffect(() => {
    if (!loading && !authenticated) {
      clearAuth()
      navigate("/login", { replace: true });
    }
  }, [authenticated, navigate,loading]);

    if (loading){
       return  <div>Loading...</div>
    }

    

  return authenticated?children:null
}

export default ProtectRoute
