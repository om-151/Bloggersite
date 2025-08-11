import { useParams } from "react-router-dom";
import BlogForm from "./BlogForm";

export default function EditBlog() {
    const { id } = useParams();

    return <BlogForm isEdit={true} blogId={id} />;
}
