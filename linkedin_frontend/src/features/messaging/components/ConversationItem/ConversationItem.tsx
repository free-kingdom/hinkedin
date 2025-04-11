import { useEffect, useState } from "react";
import { IConversation } from "../ConversationList/ConversationList"
import { useNavigate, useParams } from "react-router-dom";
import { useAuthentication } from "../../../authentication/contexts/AuthenticationContextProvider";
import { TimeAgo } from "../../../../components/TimeAgo/TimeAgo";
import { useWebSocket } from "../../../ws/WsContextProvider/WsContextProvider";

export interface ConversationItem {
    conversation: IConversation;
}

export function ConversationItem(props: ConversationItem) {
    const [conversation, setConversation] = useState(props.conversation);
    const navigate = useNavigate();
    const { id } = useParams();
    const isActive = id && Number(id) === conversation.id ? true : false;
    const { user } = useAuthentication();
    const toUser = conversation.recipient === user?.id ? conversation.author : conversation.recipient;
    const avatar = toUser.profilePicture ? toUser.profilePicture : "/default-avatar.png";
    const unreadMsgCount = conversation.messages.filter(msg => msg.receiver.id === user?.id && !msg.read).length;
    const recentMsg = conversation.messages[conversation.messages.length - 1];
    const wsClient = useWebSocket();

    useEffect(() => {
        const subscription = wsClient?.subscribe(
            "/topic/conversations/" + conversation.id,
            (msg) => {
                const message = JSON.parse(msg.body);
                setConversation(prev => ({
                    ...prev,
                    messages: prev.messages.findIndex(m => m.id === message.id) === -1
                            ? [...prev.messages, message]
                            : prev.messages.map(m => m.id === message.id ? message : m)
                }));
            }
        );
        return () => subscription?.unsubscribe();
    }, [conversation?.id, wsClient]);

    return (
        <button className={`flex w-full ${isActive ? "bg-gray-50" : "hover:bg-gray-50"} px-4 py-2 gap-2 text-start items-center cursor-pointer`}
                onClick={() => {
                    navigate("/messaging/conversations/" + conversation.id);
                }}>
            {/* 头像 + 红点 */}
            <div className="relative shrink-0">
                <img src={avatar} className="size-8 rounded-full" />
                {
                    unreadMsgCount > 0 && (
                        <span className="absolute top-0 end-0 size-3 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">{unreadMsgCount}</span>
                        </span>
                    )
                }
            </div>

            {/* 中间内容，允许缩放 */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <span className="text-sm font-bold truncate">{toUser.lastName + toUser.firstName}</span>
                <span className="text-gray-800 text-xs truncate">
                    {recentMsg.sender.lastName + recentMsg.sender.firstName + ": " + recentMsg.content}
                </span>
            </div>

            {/* 时间戳 */}
            <TimeAgo time={new Date(recentMsg.createdAt)} className="text-xs text-gray-600 shrink-0 ml-auto" />
        </button>

    );
}
