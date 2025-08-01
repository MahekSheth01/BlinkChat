import React, { useState } from 'react'
import { MessageCircleHeart } from "lucide-react" // Correct icon import
import { Link } from 'react-router-dom'
import {useMutation,useQueryClient} from "@tanstack/react-query"
import {axiosInstance} from "../lib/axios.js"
import { signup } from '../lib/api.js'
import useSignUp from '../hooks/useSignUp.js'
const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  })




  const handleSignup = (e) => {
    e.preventDefault()
    signupMutation(signupData)
  }

  const {isPending,error,signupMutation}=useSignUp()


  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="valentine">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        
        {/* SIGN UP - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2"> 
            <MessageCircleHeart className="size-9 text-primary" />
         <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">BlinkChat</span>
          </div>

        {/*Error Message*/}
        {
          error &&(
            <div className='alert alert-error mb-4 text-base'>
              <span>{error.response.data.message}</span>
            </div>
          )
        }

        <div className="w-full">
          <form onSubmit={handleSignup}>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Create an Account</h2>
                <p className='text-sm opacity-70'>
                  Join BlinkChat and start connecting with friends, family, and like-minded individuals.
                </p>
              </div>

              <div className='space-y-3'>
                  <div className='form-control w-full'>
                    <label className="label">
                      <span className='label-text'>
                        Full Name
                      </span>
                    </label>

                    <input type="text" 
                    className='input input-bordered w-full' 
                    placeholder='Mahek Sheth'
                    value={signupData.fullName}
                    onChange={(e)=>setSignupData({
                      ...signupData,
                      fullName:e.target.value
                    })}
                    required />
                  </div>
                    <div className='form-control w-full'>
                    <label className="label">
                      <span className='label-text'>
                        Email ID
                      </span>
                    </label>

                    <input type="email" 
                    className='input input-bordered w-full' 
                    placeholder='maheksheth@gmail.com'
                    value={signupData.email}
                    onChange={(e)=>setSignupData({
                      ...signupData,
                      email:e.target.value
                    })}
                    required />
                  </div>

                    <div className='form-control w-full'>
                    <label className="label">
                      <span className='label-text'>
                        Password
                      </span>
                    </label>

                    <input type="password" 
                    className='input input-bordered w-full' 
                    placeholder='*****'
                    value={signupData.password}
                    onChange={(e)=>setSignupData({
                      ...signupData,
                      password:e.target.value
                    })}
                    required />
                    <p className='text-xs opacity-70 mt-1'>
                      Password must be at least 6 characters long
                    </p>
                  </div>

                    <div className='form-control'>
                      <label className="label curser-pointer justify-start gap-2">
                        <input type="checkbox" className='checkbox checkbox-sm' required />
                        <span className='text-xs leading-tight'>
                          I agree to the {" "}
                          <span className='text-primary hover:underline'>term of service</span> and {""}
                          <span className='text-primary hover:underline'>privacy policy</span>
                        </span>
                      </label>
                    </div>
          

              </div>
              <button className='btn btn-primary w-full' type='submit'> 
                    {isPending?(
                      <>
                      <span className='loading loading-spinner loading-xs'></span>
                      Creating Account...
                      </>
                    ):("Create Account")}
              </button>

              <div className='text-center mt-4'>
                <p className='text-sm'>
                  Already have an account?{""}
                  <Link to="/login" className="text-primary hover:underline">Sign in</Link>
                </p>
              </div>


            </div>

          </form>
        </div>

        </div>
        {/*SIGN UP - RIGHT SIDE */} 
        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
            <div className='max-w-md p-8'>
              <div className='relative aspect-square max-w-sm mx-auto'>
                <img src="/Video call-bro.png" alt="Language connection illustration" className='w-full h-full'/>
              </div>

              <div className='text-center space-y-3 mt-6'>
                <h2 className='text-xl font-semibold'>Connect with language partners worldwide</h2>
                <p className='text-xs opacity-70'>
                  Practice converstations,make friends,and improve your language skills together
                </p>

              </div>

            </div>
        </div>          

      </div>
    </div>
  )
}

export default SignUpPage