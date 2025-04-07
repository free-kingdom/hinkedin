import { CompatClient, Stomp } from "@stomp/stompjs";
import { createContext, ReactNode, useContext, useEffect, useState} from "react";

const wsContext = createContext<CompatClient | null>(null);

export const useWebSocket = () => useContext(wsContext);

export function WebSocketContextProvider ({ children } : { children: ReactNode }) {
    const [stompClient, setStompClient] = useState<CompatClient | null>(null);

    useEffect(() => {
        const client = Stomp.client(`ws://localhost:8080/ws?token=${localStorage.getItem("token")}`);
        client.connect(
            {},
            () => {
                console.log("Connected to WebSocket");
                setStompClient(client);
            },
            (error: unknown) => {
                console.error("Error connecting to WebSocket:", error);
            }
        );

        return () => {
            if (client.connected) {
                client.disconnect(() => console.log("Disconnected from WebSocket"));
            }
        };
    }, []);

    return (
        <wsContext.Provider value={wsContext}>
        {children}
        </wsContext.Provider>
    );

}
