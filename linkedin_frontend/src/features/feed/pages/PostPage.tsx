import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../../utils/api";

export function PostPage() {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            await request({
                endpoint: "api/feed/posts/" + id,
                onSuccess: setPost,
                onFailure: msg => console.log(msg)
            });
        };

        fetchPost();
    }, []);

    const{ id } = useParams();
    return (
        <div>
            {id}
        </div>
    );
}
