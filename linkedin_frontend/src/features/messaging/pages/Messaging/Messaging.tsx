import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { usePageTitle } from "../../../../hooks/usePageTitle";
import { RecommendCard } from "../../../feed/components/RecommendCard/RecommendCard";
import { ConversationList } from "../../components/ConversationList/ConversationList";

export function Messaging() {
    usePageTitle("消息");
    const navigate = useNavigate();
    const location = useLocation();
    const onConversation = location.pathname.includes("conversations");

    return (
        <div className="pt-6 flex justify-center w-full">
            <div className="min-w-96 flex flex-col md:flex-row gap-6 justify-center w-full md:w-6/7 lg:w-5/6 xl:w-3/4 h-[calc(100vh-6rem)]">
                <div className="w-full h-full lg:w-2/3 border border-gray-300 rounded-lg bg-white flex">
                    <div className="w-full md:w-1/3">
                        <ConversationList />
                    </div>
                    <div className="hidden md:block flex-grow h-full">
                        <Outlet />
                    </div>
                </div>
                <div className="w-full hidden md:hidden lg:block lg:w-1/3">
                    <RecommendCard />
                </div>
            </div>
        </div>
    );
}
