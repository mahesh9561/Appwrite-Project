import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Buttons, Input, Logo } from './index'
import { UseDispatch, useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        console.log(data)
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className=' w-full flex items-center'>
            <div className={` mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className=' mb-2 flex justify-center'>
                    <span className=' inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className=' text-center text-2xl font-bold leading-tight'>
                    Sign in to your Account
                </h2>
                <p className=' mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account &nbsp;
                    <Link
                        to="/signup"
                        className=" font-medium text-primary transition-all duration-200 hover:underline"
                    >Sign Up
                    </Link>
                </p>
                {error && <p className=' text-red-500 mt-8 text-center'>{error}</p>}

                <form onSubmit={handleSubmit(login)} className=' mt-8'>
                    <div className=' space-y-5'>
                        <Input
                            label="Email :"
                            placeholder="Please Enter Email Id"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.
                                        test(value) ||
                                        "Email must be valid Address"
                                }
                            })}
                        />

                        <Input
                            label="password"
                            placeholder="Please Enter Password"
                            type="password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <Buttons
                            type='submit'
                            className=' w-full'
                        >
                            Sign In
                        </Buttons>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login