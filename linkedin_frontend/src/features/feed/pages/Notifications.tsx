import { UserProfile } from "../components/UserCards/UserProfile";
import { NotificationManageCard } from "../components/UserCards/NotificationManageCard";
import { NotificationsList } from "../components/NotificationsList/NotificationsList";
import { usePageTitle } from "../../../hooks/usePageTitle";

export function Notifications() {
    usePageTitle("通知");

    return (
        <div className="pt-6 min-h-screen flex justify-center w-full">
            <div className="min-w-96 flex flex-col md:flex-row gap-6 justify-center w-full md:w-6/7 lg:w-5/6 xl:w-3/4">
                <div className="w-full h-full md:w-1/2 lg:w-1/4">
                    <div className="flex flex-col gap-2">
                        <UserProfile />
                        <NotificationManageCard />
                    </div>
                </div>
                <div className="w-full h-full lg:w-1/2">
                    <NotificationsList />
                </div>
                <div className="w-full h-full md:hidden lg:block lg:w-1/3">

                </div>
            </div>
        </div>
    );
}
