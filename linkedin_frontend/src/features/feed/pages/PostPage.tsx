import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../../utils/api";
import { UserProfile } from "../components/UserCards/UserProfile"
import { Friends } from "../components/UserCards/Friends";
import { UserNav } from "../components/UserCards/UserNav";
import { RecommendCard } from "../components/RecommendCard/RecommendCard";
import { Post, IPost } from "../components/Post/Post";

export function PostPage() {
    const [post, setPost] = useState<IPost>(null);
    const{ id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            await request({
                endpoint: "/api/feed/posts/" + id,
                onSuccess: data => setPost(data),
                onFailure: msg => console.log(msg)
            });
        };

        fetchPost();
    }, [id]);

    return (
        <div className="pt-6 min-h-screen flex justify-center w-full">
            <div className="min-w-96 flex flex-col md:flex-row gap-6 justify-center w-full md:w-6/7 lg:w-5/6 xl:w-3/4">
                <div className="w-full h-full md:w-1/2 lg:w-1/4">
                    <div className="flex flex-col gap-2">
                        <UserProfile />
                        <Friends />
                        <UserNav />
                    </div>
                </div>
                <div className="w-full h-full lg:w-1/2">
                    <div className="flex flex-col gap-2">
                        {post && <Post key={post.id} post={post} />}
                    </div>
                </div>
                <div className="w-full h-full md:hidden lg:block lg:w-1/3">
                    <RecommendCard />
                </div>
            </div>
        </div>
    );
}
