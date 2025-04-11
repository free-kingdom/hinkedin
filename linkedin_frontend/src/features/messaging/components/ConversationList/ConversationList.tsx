import { useEffect, useState } from "react";
import { useAuthentication, User } from "../../../authentication/contexts/AuthenticationContextProvider";
import { request } from "../../../../utils/api";
import { ConversationItem } from "../ConversationItem/ConversationItem";
import { useWebSocket } from "../../../ws/WsContextProvider/WsContextProvider";
import { useNavigate } from "react-router-dom";

export interface IMessage {
    id: number;
    sender: User;
    receiver: User;
    content: string;
    createdAt: string;
    read: boolean;
}

export interface IConversation {
    id: number;
    author: User;
    recipient: User;
    messages: IMessage[];
}

function NoMessage() {
    return (
        <div className="flex flex-col justify-center text-center items-center gap-2 text-sm text-gray-900 p-4">
            <span className="" >暂时没有消息</span>
            <span className="" >主动出击，推进事业发展</span>
            <button className="border rounded-full px-2 py-1 font-bold w-20 hover:bg-gray-100 hover:ring cursor-pointer">发消息</button>
        </div>
    );
}

export function ConversationList() {
    const [conversationList, setConversationList] = useState<IConversation[]>([]);
    const { user } = useAuthentication();
    const wsClient = useWebSocket();
    const navigate = useNavigate();

    useEffect(() => {
        request<IConversation[]>({
            endpoint: "/api/messaging/conversations",
            onSuccess: data => setConversationList(data),
            onFailure: msg => console.log(msg)
        })
    }, []);

    useEffect(() => {
        const subscribtion = wsClient?.subscribe(
            "/topic/users/" + user.id + "/conversations",
            (msg) => {
                const conversation = JSON.parse(msg.body);
                setConversationList(prev => {
                    const idx = prev.findIndex(c => c.id === conversation.id);
                    if (idx === -1){
                        return [conversation, ...prev];
                    } else {
                        return prev.map(c => c.id === conversation.id ? conversation : c);
                    }
                });
            }
        );

        return () => subscribtion?.unsubscribe();
    }, [user?.id, wsClient])

    return (
        <div className="flex flex-col border-r-1 md:border-r-2 border-gray-200 h-full">
            <div className="flex items-center border-b-1 border-gray-200 shadow-xs p-4 w-full h-12 justify-between">
                <span className="font-bold">消息列表</span>
                <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
                        onClick={() => navigate("conversations/new")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="size-4 text-stone-700">
                        <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"/>
                    </svg>
                </button>
            </div>
            <div className="flex w-full h-full justify-center">
                {
                    conversationList.length === 0
                    ? <NoMessage />
                    : <ul className="w-full">
                        {conversationList.map( c => (
                            <li key={c.id}>
                                <ConversationItem conversation={c} />
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    );
}
