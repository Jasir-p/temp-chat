import React,{useState} from 'react'
import { Button } from '../components/FormButton'
import { Input } from '../components/FormInput'
import axios from 'axios'

const Login = () => {


  const [formData,setFormData]= useState({
    username:'',
    password:''
  })

const handleChanges = (e)=>{
  setFormData({
    ...formData,
    [e.target.name]:e.target.value
  })
}
  const handleSubmit = async() => {
    console.log('Registration data:', formData);
    const response = await axios.post(
                "http://localhost:8000/api/user/login/",
                formData,
                { withCredentials: true }
                );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className="text-3xl font-bold text-sky-600 mb-2">LetsChat</h1>
          <p className="text-gray-600">Sign up</p>
        </div>
      
       <div className="space-y-6">
          <Input
            label="Username"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChanges}
            placeholder="Enter your username"
          />

          

          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChanges}
            placeholder="Enter your password"
          />
          <Button
          onClick={handleSubmit}
          variant='primary'
          size='md'
          className='w-full'
          >Sign in</Button>
          </div>

          <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            you have not account?{' '}
            <a href="#" className="text-sky-600 hover:text-sky-700 font-medium">
              Sign Up
            </a>
          </p>
        </div>
          
        </div>
    </div>
  )
}

export default Login
