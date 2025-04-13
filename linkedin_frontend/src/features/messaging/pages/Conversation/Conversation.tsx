import { FormEvent, useEffect, useState } from "react";
import { IConversation } from "../../components/ConversationList/ConversationList";
import { useAuthentication } from "../../../authentication/contexts/AuthenticationContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../../../utils/api";
import { MessageItem } from "../../components/MessageItem/MessageItem";
import { useWebSocket } from "../../../ws/WsContextProvider/WsContextProvider";
import { ReturnButton } from "../../components/ReturnButton/ReturnButton";

export function Conversation() {
    const [conversation, setConversation] = useState<IConversation | null>(null);
    const { user } = useAuthentication();
    const { id } = useParams();
    const [content, setContent] = useState<string>("");
    const toUser = conversation && conversation?.author.id === user.id ? conversation?.recipient : conversation?.author;
    const avatar = toUser?.profilePicture || "/default-avatar.png";
    const [isProcessing, setIsProcessing] = useState(false);
    const wsClient = useWebSocket();
    const navigate = useNavigate();

        /* 组件挂载时获取对话 */
    useEffect(() => {
        const fetchConversatoin = async () => {
            await request({
                endpoint: "/api/messaging/conversation/" + id,
                onSuccess: (data) => {
                    setConversation(data);
                    data.messages.forEach(m => {
                        if (m.receiver.id === user.id && !m.read){
                            markMessageRead(m.id);
                        }
                    });
                },
                onFailure: msg => {
                    navigate("/messaging");
                }
            });
        }
        fetchConversatoin();
    }, [id]);

    /* 标记消息为已读，成功后更新conversation */
    const markMessageRead = async (msgId) => {
        await request({
            endpoint: "/api/messaging/conversations/messages/" + msgId,
            method: "PUT",
            onSuccess: (message) => {},
            onFailure: (msg) => console.log(msg)
        });
    };

    /* 订阅更新的消息，并标记已读 */
    useEffect(() => {
        const subscription = wsClient?.subscribe(
            `/topic/conversations/${conversation?.id}`,
            msg => {
                const message = JSON.parse(msg.body);
                if (message.receiver.id === user.id && !message.read) {
                    markMessageRead(message.id);
                } else {
                    setConversation(prev => {
                        return {
                            ...prev,
                            messages: prev?.messages.findIndex(m => m.id === message.id) === -1
                                    ? [...prev.messages, message]
                                    : prev?.messages.map(m => m.id === message.id ? message : m)
                        }
                    });
                };
            }
        );
        return () => subscription?.unsubscribe();
    }, [conversation?.id, wsClient]);

    const onSendMessage = async (evt:FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setIsProcessing(true);
        await request({
            endpoint: `/api/messaging/conversations/${conversation.id}/messages`,
            method: "POST",
            body: JSON.stringify({
                receiverId: toUser.id,
                content: content
            }),
            onSuccess: data => {
                /* setConversation(prev => {
                 *     return {
                 *         ...prev,
                 *         messages: [...prev?.messages, data]
                 *     };
                 * }) */;
                setContent("");
                setIsProcessing(false);
            },
            onFailure: msg => {
                console.log(msg);
                setIsProcessing(false);
            }
        });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 px-2 py-2 border-b border-b-gray-200 shadow-xs flex-none">
                <ReturnButton returnURL={"/messaging"} />
                <img src={avatar} className="size-9 rounded-full" />
                <span>{conversation && toUser.lastName + toUser.firstName}</span>
                <button className="p-1 hover:bg-gray-50 rounded-full cursor-pointer ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="size-4 text-gray-700">
                        <path d="M14 12a2 2 0 11-2-2 2 2 0 012 2zM4 10a2 2 0 102 2 2 2 0 00-2-2zm16 0a2 2 0 102 2 2 2 0 00-2-2z"/>
                    </svg>
                </button>
            </div>
            <div className="grow overflow-y-auto min-h-0 pt-8 px-4 py-2 flex flex-col w-full gap-2">
                {conversation?.messages.map(m => {return (
                    <MessageItem key={m.id} message={m}/>
                )})}
            </div>
            <form className="relative flex-none px-4 pb-6"
                  onSubmit={onSendMessage}>
                <input type="text" value={content} onChange={(evt) => setContent(evt.target.value)}
                       placeholder="发送消息..."
                       className="border border-gray-400 px-2 focus:outline-none focus:ring focus:ring-linkedin py-2 rounded-lg w-full"/>
                <button type="submit"
                        disabled={!conversation || isProcessing || !content.trim()}
                        className="absolute top-1.5 end-5 bg-linkedin py-1 text-white font-bold text-sm rounded-full px-2 hover:bg-blue-900 cursor-pointer disabled:bg-gray-400 disabled:cursor-default">
                    发送
                </button>
            </form>
        </div>
    );
}
