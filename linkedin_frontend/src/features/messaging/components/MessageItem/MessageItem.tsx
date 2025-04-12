import { useEffect, useRef, useState } from "react"
import { IMessage } from "../ConversationList/ConversationList"
import { useAuthentication } from "../../../authentication/contexts/AuthenticationContextProvider";

interface MessageItemProps {
    message: IMessage;
}

export function MessageItem(props: IMessage) {
    const [message, setMessage] = useState<IMessage>(props.message);
    const { user } = useAuthentication();
    const isMessageByUser = message.sender.id === user.id;
    const msgRef = useRef<HTMLDivElement>();

    useEffect(() => {
        msgRef.current.scrollIntoView();
    }, []);

    return (
        <div className={`${isMessageByUser ? "ml-auto flex-row-reverse" : "mr-auto"} flex gap-2 items-center w-full`}
             ref={msgRef}>
            <img src={
            isMessageByUser
            ? message.sender.profilePicture || "/default-avatar.png"
            : message.receiver.profilePicture || "/default-avatar.png"
            }
                 className="size-8"/>
            <div className="border border-gray-200 rounded-lg px-2 py-1 max-w-2/3 bg-linkedin/10">
                <div className="text-sm text-stone-900 break-words whitespace-pre-wrap">{message.content}</div>
            </div>
            {message.sender.id === user.id &&
             <span className="self-end text-xs text-gray-400 -ml-1">{message.read ? "已读" : "未读"}</span>}
        </div>
    )
}
