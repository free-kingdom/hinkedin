import { useEffect, useState } from "react";
import { request } from "../../../../utils/api";
import { NotificationItem } from "./Notification";

function SortButton({ text, isActive }) {
    return (
        isActive
        ? <button className="h-8 w-14 px-2 py-0.5 bg-green-800 hover:bg-green-900 font-bold text-white rounded-full cursor-pointer">{text}</button>
        : <button className="h-8 w-14 px-2 py-0.5 font-bold text-gray-500 border border-gray-400 rounded-full bg-white hover:bg-gray-50 hover:border-2 cursor-pointer">{text}</button>
    );
}


function SortNotificationsListPanel() {
    return (
        <div className="flex gap-2 bg-white p-3 border border-gray-300 rounded-lg">
            <SortButton text={"未读"} isActive={true}/>
            <SortButton text={"全部"} isActive={false}/>
            <SortButton text={"点赞"} isActive={false}/>
            <SortButton text={"评论"} isActive={false}/>
        </div>
    );
}

export function NotificationsList() {
    const [notificationsList, setNotificationsList] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            await request<NotificationProps[]>({
                endpoint: "/api/notifications",
                onSuccess: setNotificationsList,
                onFailure: (msg) => console.log(msg)
            });
        };

        fetchNotifications();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <SortNotificationsListPanel />
            {
                notificationsList.length === 0
                ? <div className="flex p-4 bg-white border border-gray-300 rounded-lg text-gray-700">
                    没有通知
                </div>
                : <div className="flex flex-col bg-white border border-gray-300 rounded-lg p-2">
                    {
                        notificationsList.map(n => {
                            return (
                                <NotificationItem key={n.id} notification={n} setNotificationsList={setNotificationsList}/>
                            );
                        })
                    }
                </div>

            }
        </div>
    );
}
