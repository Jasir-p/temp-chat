import { useEffect,useRef,useCallback } from "react";


export const useChatSocket = (roomID,setMessage,setOnlineMembers)=>{
    const socketRef = useRef(null)
    const WS_URL = import.meta.env.VITE_WS_URL;

    useEffect(()=>{
        const socket = new WebSocket(
            `${WS_URL}/ws/chat/${roomID}/`
        )
        socketRef.current = socket


        socket.onopen = ()=>{
            console.log("connected");
            
        }
        socket.onerror = (error)=>{
            console.error("webSocket error", error);
            
        }
        socket.onclose = (event) =>{
            console.log("websocket closed",event);
            
        }
        socket.onmessage = (event) => {
            console.log("message from server:", event.data);
            const eventdata = JSON.parse(event.data)
            if (eventdata.type==="chat"){
                setMessage((prev)=>[...prev,eventdata.message])
            }
            if (eventdata.type==="members"){
                setOnlineMembers(eventdata.members)
            }
            

            }

        return () => {
    socket.onclose = null
      socket.close();
    };
    },[roomID])
    const sendMessage = useCallback((message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN){
            socketRef.current.send(JSON.stringify({message}));
        } else{
            console.error("WebSocket is not connected.")
        }
    },[]);

    return { sendMessage,socket:socketRef.current };
    
}