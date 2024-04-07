
const BlogSkeleton = () => {
    return (
        <div className="flex flex-col items-center justify-center">
        <div role="status" className="max-w-xl animate-pulse mb-6 w-full ">
            <div className="flex justify-start items-center gap-2 mb-2">
                <svg className="w-6 h-6 me-3 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div className="h-2 bg-gray-200 rounded-full w-32"></div>
                <div className="h-1.5 bg-gray-200 rounded-full w-32"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded-full w-96 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[600px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[600px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[600px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[600px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[600px] mb-2.5"></div>
            <span className="sr-only">Loading...</span>
        </div>
        </div>

    )
}

export default BlogSkeleton