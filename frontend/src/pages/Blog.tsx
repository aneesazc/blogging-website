import { useParams } from "react-router-dom"
import useBlog from "../hooks/useBlog"
import BlogPost from "../components/BlogPost"
import Appbar from "../components/Appbar"
import Spinner from "../components/Spinner"


const Blog = () => {
  const { id } = useParams()
  const { loading, blog } = useBlog(id)
  console.log(blog)
  return (
    <div>
      {loading || !blog ? <div>
        <Appbar />
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      </div> : (
        <BlogPost
          blog={blog}
        />
      )}
    </div>
  )
}

export default Blog