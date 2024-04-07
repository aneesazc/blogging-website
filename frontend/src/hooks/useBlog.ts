import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export interface Blog {
    id: string;
    title: string
    content: string,
    author: {
        name: string
    }
}

const useBlog = (id: string | undefined) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [blog, setBlog] = useState<Blog>()
  console.log(id)

  useEffect(() => {
    async function getBlog(){
      try {
        const res = await axios.get(`https://backend-medium.anees-azc.workers.dev/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        // console.log(res.data)
        setBlog(res.data)
        setLoading(false)
      } catch (error) {
        toast.error("Error while fetching blog")
      }
    }
    getBlog()
  }, [])

    return {loading, blog}
}

export default useBlog