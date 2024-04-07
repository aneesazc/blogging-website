import { Blog } from "../hooks/useBlog"
import Appbar from "./Appbar"
import { Avatar } from "./BlogCard"


const BlogPost = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="felx flex-col justify-center sm:grid sm:grid-cols-12 px-10 pt-12 w-full max-w-screen-xl">
          <div className="sm:col-span-8">
            <div className="flex flex-col items-center w-full mb-5 text-left sm:block sm:w-auto sm:mb-auto">
              <div className="text-3xl font-bold sm:text-5xl sm:font-extrabold">
                {blog.title}
              </div>
              <div className="text-slate-500 text-sm pt-2">
                Posted on April 6, 2024 by {blog.author.name}
              </div>
              <div className="text-base font-serif pt-4 sm:text-lg">
                {blog.content}
              </div>
            </div>
          </div>
          <div className="sm:col-span-4">
            <div className="text-slate-600">
              Author
            </div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="large" authorName={blog.author.name} />
              </div>
                <div>
                  <div className="text-lg font-bold">
                    {blog.author.name}
                  </div>
                  <div className="pt-2 text-slate-500">
                    Random catchphrase here to make the author look cool and grab the reader's attention
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPost