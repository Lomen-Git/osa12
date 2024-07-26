

const BlogList = ({ blogs }) => {
    return (
        <div>
            {blogs.map(blog => (
                <li key={blog.id}>
                    {blog.title}
                </li>
            ))}
        </div>
    )
}

export default BlogList