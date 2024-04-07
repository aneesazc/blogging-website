import { useState } from "react"
import Appbar from "../components/Appbar"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { BACKEND_URL } from "../config"


const Publish = () => {
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const navigate = useNavigate()

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" required 
                    onChange={(e) => setTitle(e.target.value)}
                />
                </div>
            </div>
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <textarea rows={20} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder="Write your post here..." required
                        onChange={(e) => setContent(e.target.value)}
                    >
                    </textarea>
                </div>
            </div>
            <div className="flex justify-center w-full pt-4">
                <div className="max-w-screen-lg w-full">
                    <button type="submit" 
                        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                        onClick={async () => {
                            try {
                                const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                title,
                                content
                            }, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            })  
                            toast.success("Post published successfully")  
                            navigate(`/blog/${res.data.id}`)
                                
                            } catch (error) {
                                toast.error("Error while publishing post")
                            }
                            
                        }}
                    >
                        Publish post
                    </button>
                </div>
                
            </div>
            
        </div>
    )
}

export default Publish