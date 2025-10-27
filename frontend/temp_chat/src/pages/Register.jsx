import React,{useState} from 'react'
import { Input } from '../components/FormInput'
import { Button } from '../components/FormButton'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { validateEmail,validateName,validatePassword } from '../utils/Validations';
import { showSuccess } from '../utils/toast';



const Register = () => {
  const navigate = useNavigate()

      const [formData,setFormData]= useState({
        username:'',
        email:'',
        password:''
      })

      const[formErrors,setFormErrors]= useState({})
    
    const handleChanges = (e)=>{
      
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      })
    }
    const handleSubmit = async() => {
      
      if(!formData) return

      const errors = {}

      const nameError = validateName(formData.username)
      if (nameError) errors.username = nameError

      const emailError = validateEmail(formData.email)
      if (emailError) errors.email = emailError

      const passwordError = validatePassword(formData.password)
       if (passwordError) errors.password= passwordError


       if (Object.keys(errors).length >0){
        setFormErrors(errors)
        return
       }
      


      try {
      const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/user/register/`,
        formData 
        );
        setFormErrors({})
        showSuccess("Registred Successfully")
        navigate("/login")

  } catch (error) {
    if (error.response?.data?.error){
      const backendErros = {}
      Object.entries(error.response.data.error).forEach(([field,msg])=>{
        backendErros[field] = msg.join(",")
      })
      setFormErrors((prev)=>({...prev, ...backendErros}))
    }
    
  }

      };
  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className="text-3xl font-bold text-sky-600 mb-2">LetsChat</h1>
          <p className="text-gray-600">Create your account</p>
        </div>
      
       <div className="space-y-6">
        <div>
      
          <Input
            label="Username"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChanges}
            placeholder="Enter your username"
          />
          {formErrors.username && <span className="text-red-500 text-sm">{formErrors.username}</span>}
        </div>
        <div>
          
          <Input
            label="email"
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChanges}
            placeholder="Enter your email"
          />
          {formErrors.email&& <span className="text-red-500 text-sm">{formErrors.email}</span>}
        </div>

          
          <div>
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChanges}
            placeholder="Enter your password"
          />
          {formErrors.password&& <span className="text-red-500 text-sm">{formErrors.password}</span>}
        </div>
          <Button
          onClick={handleSubmit}
          variant='primary'
          size='md'
          className='w-full'
          >Sign Up</Button>
          </div>

          <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            already have a account?{' '}
            <button type='button' className="text-sky-600 hover:text-sky-700 font-medium" onClick={()=>navigate("/login")}>
              Sign in
            </button>
          </p>
        </div>
          
        </div>
    </div>
  )
}

export default Register
