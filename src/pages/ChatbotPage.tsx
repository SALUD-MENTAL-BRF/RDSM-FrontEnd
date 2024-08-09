import React from "react";
import { BoxChat } from "../components/main/chatbot/BoxChat";
import { Header } from "../components/headers/Header";
import "../assets/style/chatbot.css";
export const ChatbotPage: React.FC = () => {
    
    return(
        <>
            <Header/>
            <BoxChat/>
        </>
    )
}