import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from '../Context/FirebaseContext';
import { FaEyeSlash } from 'react-icons/fa6';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState('password');
    const firebase = useFirebase();
    const navigate = useNavigate();
    return (
        <>
            <h1>Sign Up</h1>
            <div className='flex flex-col items-start'>
            <label htmlFor='name'>
                    Name
                </label>
                <div className='bg-gray-800 p-1 rounded-md'>
                    <input 
                        type="text" 
                        id='name' 
                        placeholder='Enter your Name' 
                        onChange={(e) => setName(e.currentTarget.value)} 
                        value={name}
                        className='p-2 outline-0 bg-gray-800 transition-all transition-duration-2s m-2 rounded-md' 
                    />
                </div>
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
                        className='outline-0 bg-gray-800 transition-all transition-duration-2s m-2 rounded-md'
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
                        firebase.signupUserWithEmailAndPassword(name, email, password);
                        setName('');
                        setEmail('');
                        setPassword('');
                        navigate('/signin');
                    }}
                    type="submit"
                    className='bg-gray-700 m-2'
                >
                    Sign Up
                </button>
            </div>
            <p>Already have an account </p><Link to='/signin'>Signin</Link>
        </>
    )
}
export default Signup