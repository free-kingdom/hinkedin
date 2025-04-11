import { FormEvent, useEffect, useState } from "react";
import { IConversation } from "../../components/ConversationList/ConversationList";
import { useAuthentication } from "../../../authentication/contexts/AuthenticationContextProvider";
import { useParams } from "react-router-dom";
import { request } from "../../../../utils/api";
import { MessageItem } from "../../components/MessageItem/MessageItem";

export function Conversation() {

    const [conversation, setConversation] = useState<IConversation | null>(null);
    const { user } = useAuthentication();
    const { id } = useParams();
    const [content, setContent] = useState<string>("");
    const toUser = conversation && conversation?.author.id === user.id ? conversation?.recipient : conversation?.author;
    const avatar = toUser?.profilePicture || "/default-avatar.png";
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchConversatoin = async () => {
            await request({
                endpoint: "/api/messaging/conversation/" + id,
                onSuccess: (data) => {
                    setConversation(data);
                },
                onFailure: msg => console.log(msg)
            });
        }
        fetchConversatoin();
    }, [id]);

    const onSendMessage = async (evt) => {

    };


    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-b-gray-200 shadow-xs flex-none">
                <img src={avatar} className="size-9 rounded-full" />
                <span>{conversation && toUser.lastName + toUser.firstName}</span>
                <button className="p-1 hover:bg-gray-50 rounded-full cursor-pointer ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="size-4 text-gray-700">
                        <path d="M14 12a2 2 0 11-2-2 2 2 0 012 2zM4 10a2 2 0 102 2 2 2 0 00-2-2zm16 0a2 2 0 102 2 2 2 0 00-2-2z"/>
                    </svg>
                </button>
            </div>
            <div className="grow overflow-y-auto min-h-0 px-4 py-2">
                {conversation?.messages.map(m => {return (
                    <MessageItem message={m}/>
                )})}
            </div>
            <form className="relative flex-none p-2"
                  onSubmit={onSendMessage}>
                <input type="text" value={content} onChange={(evt) => setContent(evt.target.value)}
                       placeholder="发送消息..."
                       className="border border-gray-400 px-2 focus:outline-none focus:ring focus:ring-linkedin py-1 rounded-lg w-full"/>
                <button type="submit"
                        disabled={isProcessing || !content.trim()}
                        className="absolute top-2.5 end-3 bg-linkedin p-1 text-white font-bold text-sm rounded-full px-2 hover:bg-blue-900 cursor-pointer">
                    发送
                </button>
            </form>
        </div>
    );
}
