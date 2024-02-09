import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/FirebaseContext';
import { FaGoogle } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState('password');
    return (
        <>
            <h1>Sign In</h1>
            <div className='flex flex-col items-start'>
                <label htmlFor='email'>
                    Email
                </label>
                <div className='bg-gray-800 p-1 rounded-md'>
                    <input 
                        type="email" 
                        id='email' 
                        placeholder='Enter your Email' 
                        onChange={(e) => setEmail(e.currentTarget.value)} 
                        value={email}
                        className='p-2 outline-0 bg-gray-800 transition-all transition-duration-2s m-2 rounded-md' 
                    />
                </div>
                <label htmlFor='password'>
                    Password
                </label>
                <div className='bg-gray-800 p-2 rounded-md'>
                    <input 
                        type={showPassword} 
                        id='password' 
                        placeholder='Enter your Password' 
                        onChange={(e) => setPassword(e.currentTarget.value)} 
                        value={password} 
                        className='outline-0 bg-gray-800  transition-all transition-duration-2s m-2 rounded-md'
                    />
                    <FaEyeSlash 
                        onClick={
                            () => showPassword === "password" ? setShowPassword("text") : setShowPassword("password")
                        }
                        className='inline-block cursor-pointer'
                    />
                </div>
                <button 
                    onClick={() => {
                        firebase.signinUserWithEmailAndPassword(email, password);
                        setEmail('');
                        setPassword('');
                        console.log("Success");
                        navigate('/');
                    }}
                    type="submit"
                    className='bg-gray-700 m-2'
                >
                    Sign In
                </button>
            </div>
            <p>If you don't have an account </p><Link to='/signup' className='inline-block'>Signup</Link>
            {/* <button 
                className=' bg-blue-950 hover:bg-blue-900 w-[100%]'
            >
                Continue with Google 
                <FaGoogle className='inline-block ml-2 text-red-600' />
            </button> */}
        </>
    )
}
export default Signin