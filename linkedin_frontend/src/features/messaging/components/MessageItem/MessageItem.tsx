import { useState } from "react"
import { IMessage } from "../ConversationList/ConversationList"

interface MessageItemProps {
    message: IMessage;
}

export function MessageItem(props: IMessage) {
    const [message, setMessage] = useState(props.message);

    return (
        <div>{message.id}</div>
    )
}
