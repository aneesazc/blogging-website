import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import {SignupInput} from "@aneesazc/backend-blog"
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";


const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })
    
    async function sendRequest(){
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs)
            console.log(res.data)
            const jwt = res.data.jwt
            localStorage.setItem("token", jwt)
            toast.success(`${type === "signup" ? "Account created successfully" : "Logged in successfully"}`)
            navigate("/blogs")
        } catch (error) {
            console.log(error)
            toast.error(`Error while ${type}`)
        }
    }

  return (
    <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-4xl font-bold">
                        {type === "signup" ? "Create an account" : "Login to your account"}
                    </div>
                    <div className="text-slate-400 mb-6 text-center">
                        {type === "signup" ? "Already have an account?" : "Don't have an account?"} 
                        <Link to={`/${type === "signup" ? "signin" : "signup"}`} className="pl-2 underline">{type === "signup" ? "Login" : "Signup"}</Link>
                    </div>
                </div>
                <div className="pt-1">
                    {type === "signup" && <LabledInput label="Name" placeholder="John Doe" type="text" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        }))
                    }} />}
                    <LabledInput label="Email" placeholder="Enter your email" type="email" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            email: e.target.value
                        }))
                    }} />
                    <LabledInput label="Password" placeholder="Enter your password" type="password" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }} />
                    <button 
                        type="button" 
                        className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        onClick={sendRequest}
                        >
                            {type === "signup" ? "Sign up" : "Sign in"}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

interface LabledInputTypes {
    label: string;
    placeholder: string;
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;

}

function LabledInput({label, placeholder, type, onChange}: LabledInputTypes){
    return (
        <div>
            <div className="mt-4">
                <label className="block mb-2 text-md font-semibold text-gray-900">{label}</label>
                <input type={type} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                    placeholder={placeholder} required 
                    onChange={onChange}
                />
            </div>
        </div>

    )
}

export default Auth

