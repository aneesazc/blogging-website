import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


const useBlogs = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [blogs, setBlogs] = useState<any[]>([])

  useEffect(() => {
    async function getBlogs(){
      try {
        const res = await axios.get("https://backend-medium.anees-azc.workers.dev/api/v1/blog/bulk", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        setBlogs(res.data)
        setLoading(false)
      } catch (error) {
        toast.error("Error while fetching blogs")
      }
    }
    getBlogs()
  }, [])

    return {loading, blogs}
}

export default useBlogs