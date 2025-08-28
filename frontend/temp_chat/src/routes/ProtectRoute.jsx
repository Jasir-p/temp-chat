import React,{useEffect, useState} from 'react'
import { ProtectRouteApi } from '../api/ProtectRouteApi'
import { useNavigate } from 'react-router-dom';


const ProtectRoute = ({children}) => {
    const [loading,setLoading]=useState(true)
    const [authenticated,setAuthenticated] = useState(false)
    const navigate = useNavigate()
    
    
useEffect(() => {
  const checkAuth = async () => {
    try {
      await ProtectRouteApi();
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
      navigate("/login", { replace: true });
    }
  }, [authenticated, navigate,loading]);

    if (loading){
       return  <div>Loading...</div>
    }

    

  return authenticated?children:null
}

export default ProtectRoute
