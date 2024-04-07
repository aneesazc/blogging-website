import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import BlogSkeleton from "../components/BlogSkeleton"
import useBlogs from "../hooks/useBlogs"


const Blogs = () => {
    const {loading, blogs} = useBlogs()
    if(loading){
        return <div>
            <Appbar />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
        </div>
    }
  return (
    <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="w-10/12 md:max-w-2xl">
                {blogs.map(blog => {
                    return <BlogCard
                        key={blog.id}
                        id={blog.id}
                        authorName={capitalizeEachWord(blog.author.name)}
                        title={blog.title}
                        content={blog.content}
                        publishedDate="April 6, 2024"
                    />
                
                })}
            </div>
        </div>
    </div>
  )
}

function capitalizeEachWord(str: string){
    return str.split(" ").map(word => {
        return word[0].toUpperCase() + word.slice(1)
    }).join(" ")
}

export default Blogs