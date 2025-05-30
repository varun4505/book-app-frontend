import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [message, setMessage] = useState("");
    const {registerUser, signInWithGoogle} = useAuth();
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async(data) => {
        try {
            await registerUser(data.email, data.password);
            alert("User registered successfully!")
            navigate("/login");
        } catch (error) {
           setMessage("Please provide a valid email and password") 
           console.error(error)
        }
    }

    const handleGoogleSignIn = async() => {
        try {
            await signInWithGoogle();
            alert("Login successful!");
            navigate("/")
        } catch (error) {
            alert("Google sign in failed!") 
            console.error(error)
        }
    }
    
    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 transition-colors duration-200'>
                <div className='text-center mb-6'>
                    <h2 className='text-2xl font-heading font-semibold text-secondary'>Create Account</h2>
                    <p className='text-sm text-gray-500 mt-2'>Join our community of book lovers</p>
                </div>

                {message && <p className='text-error text-sm mb-4'>{message}</p>}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-secondary text-sm font-medium mb-2'>
                            Email
                        </label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary' 
                        type="email" 
                        placeholder='Enter your email'
                        {...register("email", { 
                            required: "Email is required", 
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            }
                        })}
                        />
                        {errors.email && <p className='text-error text-xs mt-1'>{errors.email.message}</p>}
                    </div>
                    <div className='mb-6'>
                        <label className='block text-secondary text-sm font-medium mb-2'>
                            Password
                        </label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary' 
                        type="password" 
                        placeholder='Create a password'
                        {...register("password", { 
                            required: "Password is required", 
                            minLength: {
                                value: 6,
                                message: "Password must have at least 6 characters",
                            }
                        })}
                        />
                        {errors.password && <p className='text-error text-xs mt-1'>{errors.password.message}</p>}
                    </div>
                    <div className='mb-6'>
                        <button className='bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline transition-colors duration-200' 
                        type="submit"
                        >
                            Register
                        </button>
                    </div>
                    <div className='text-center'>
                        <p className='text-sm text-gray-600'>
                            Already have an account? 
                            <Link to="/login" className='text-primary ml-1 hover:underline'>
                                Login
                            </Link>
                        </p>
                    </div>
                </form>

                <div className='mt-6'>
                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300'></div>
                        </div>
                        <div className='relative flex justify-center'>
                            <span className='px-3 bg-white text-gray-500 text-sm'>
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <button onClick={handleGoogleSignIn} className='mt-4 flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 text-sm font-medium text-secondary transition-colors duration-200'>
                        <FaGoogle className='mr-2 text-red-500' />
                        Sign up with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register