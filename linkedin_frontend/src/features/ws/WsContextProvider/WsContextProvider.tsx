import { Client, Stomp } from "@stomp/stompjs";
import { createContext, ReactNode, useContext, useEffect, useState} from "react";

const wsContext = createContext<CompatClient | null>(null);

export const useWebSocket = () => useContext(wsContext);

export function WebSocketContextProvider ({ children } : { children: ReactNode }) {
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const client = new Client({
            brokerURL: `${import.meta.env.VITE_API_URL}/ws`,
            connectHeaders: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        client.onConnect = (frame) => {
            console.log("Connected to WebSocket");
            setStompClient(client);
        };

        client.onDisconnect = () => {
            console.log("Disconnected to WebSocket");
        };

        client.onWebSocketClose = () => {
            console.log("WebSocket closed");
        }

        client.activate();

        return () => {
            client.deactivate();
        };
    }, []);

    return (
        <wsContext.Provider value={stompClient}>
        {children}
        </wsContext.Provider>
    );
}
