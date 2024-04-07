import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"


const Appbar = () => {
  const navigate = useNavigate()
  return (
    <div className="border-b flex justify-between px-10 py-4">
        <div className="font-semibold text-xl flex items-center">
          <Link to="/blogs">Medium</Link>
        </div>
        <div>
            <Link to={"/publish"}>
              <button type="button" 
                className="mr-4 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Publish
              </button>
            </Link>
            <Link to={"/signin"}>
              <button type="button" 
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => {
                  localStorage.removeItem("token")
                  navigate("/signin")
                }}
              >
                Logout
              </button>
            </Link>
            <Avatar size="large" authorName="John Doe" />
        </div>
    </div>
  )
}

export default Appbar