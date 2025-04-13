import { useAuthentication } from "../../authentication/contexts/AuthenticationContextProvider"
import { RecommendCard } from "../components/RecommendCard/RecommendCard";
import { UserProfile } from "../components/UserCards/UserProfile"
import { Friends } from "../components/UserCards/Friends";
import { UserNav } from "../components/UserCards/UserNav";
import { PostsList } from "../components/PostsList/PostsList";
import { usePageTitle } from "../../../hooks/usePageTitle";

export function UserPosts() {
    const { user, logout } = useAuthentication();
    usePageTitle("文章和动态");

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
                    <PostsList fetchListURL={"/api/feed/posts/user/" + user.id}/>
                </div>
                <div className="w-full h-full md:hidden lg:block lg:w-1/3">
                    <RecommendCard />
                </div>
            </div>
        </div>
    )
}
