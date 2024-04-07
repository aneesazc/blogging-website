import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id?: string;
}

const BlogCard = (
    { authorName, title, content, publishedDate, id = "1" }: BlogCardProps
) => {
    return (
        <Link to={`/blog/${id}`} className="hover:cursor-pointer">
        <div className="border-b-2 border-gray-200 pb-6 pt-4">
            <div className="flex items-center">
                <div className="flex flex-col justify-center">
                    <Avatar authorName={authorName} />
                </div>
                <div className="tex-sm pl-2 font-medium">{authorName}</div> 
                <div className="text-sm w-1 h-1 bg-gray-400 rounded-full ml-2"></div>
                <div className="pl-2 text-sm text-slate-600">{publishedDate}</div>
            </div>
            <div className="text-xl md:text-2xl font-bold mt-2">
                {title}     
            </div>
            <div className="font-serif text-md md:text-lg">
                {content.slice(0, 150)}{content.length > 100 && "..."}
            </div>
            <div className="text-slate-600 font-normal text-sm pt-4">
                {`${Math.ceil(content.length / 100)} min read`}
            </div>
        </div>
        </Link>
    )
}

export function Avatar({ authorName, size = "small" }: { authorName: string, size?: "small" | "large"}) {
    return (
        <div 
            className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "h-6 w-6": "h-10 w-10"}`}>
            <span className={`font-medium text-gray-600 dark:text-gray-300 ${size === "small" ? "text-sm": "text-lg"}`}>{authorName[0].toUpperCase()}</span>
        </div>
    )
}

export default BlogCard