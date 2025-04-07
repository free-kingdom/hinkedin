import { User } from "../../../authentication/contexts/AuthenticationContextProvider";
import { TimeAgo } from "../../../../components/TimeAgo/TimeAgo";
import { request } from "../../../../utils/api";
import { useNavigate } from "react-router-dom";
import { NotificationBadge } from "../../../../components/NotificationBadge/NotificationBadge";

interface Notification {
    id: number;
    recipient: User;
    actor: User;
    type: "LIKE" | "COMMENT";
    resourceId: number;
    createdAt: string; // ISO 格式时间字符串
    read: boolean;
}

export function NotificationItem({ notification, setNotificationsList }) {
    const navigate = useNavigate();
    let actor = notification.actor;
    let actorAvatar = actor.avatar ? actor.avatar : "/default-avatar.png";

    const markNotificationRead = async () => {
        if (!notification.read){
            await request({
                endpoint: "/api/notifications/" + notification.id,
                method: "PUT",
                onSuccess: (data) => console.log(data),
                onFailure: (msg) => console.log(msg)
            });
        }
    };

    return (
        <div className="flex p-4 w-full items-center hover:bg-gray-50 gap-2"
        onClick={()=>{
            markNotificationRead();
            setNotificationsList(nl => nl.map(n => n.id === notification.id ? {...notification, read: true} : n));
            {/* TODO */}
            navigate("/");
        }}
        >
        <div className="relative">
            <img src={actorAvatar} className="size-10 rounded-full"/>
            {!notification.read && <NotificationBadge />}
        </div>
        {
            notification.type === "LIKE" &&
            <span className="text-sm">{actor.lastName + actor.firstName}赞了你的推文</span>
        }
        <TimeAgo time={new Date(notification.createdAt)}
                 className="text-xs text-gray-500 leading-tight justify-self-end"/>
        </div>
    );
}
