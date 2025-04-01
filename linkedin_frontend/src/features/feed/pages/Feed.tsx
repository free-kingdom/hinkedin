import { useAuthentication } from "../../authentication/contexts/AuthenticationContextProvider"
import { RecommendCard } from "../components/RecommendCard/RecommendCard";
import { UserCards } from "../components/UserCards/UserCards";
import { FeedsCard } from "../components/FeedsCard/FeedsCard";

export function Feed() {
    const { user, logout } = useAuthentication();

    return (
        <div className="pt-6 min-h-screen flex justify-center w-full">
            <div className="min-w-96 flex flex-col md:flex-row gap-6 justify-center w-full md:w-6/7 lg:w-5/6 xl:w-3/4">
                <div className="w-full h-full md:w-1/2 lg:w-1/4">
                    <UserCards />
                </div>
                <div className="w-full h-full lg:w-1/2">
                    <FeedsCard />
                </div>
                <div className="w-full h-full md:hidden lg:block lg:w-1/3">
                    <RecommendCard />
                </div>
            </div>
        </div>
    )
}
