import React from "react";
import { Home } from "../components/main/Home";
import { Header } from "../components/headers/Header";
import { Footer } from "../components/footer/Footer";

export const HomePage : React.FC = () => {
    return(
        <>  
            <Header/>
            <Home/>
            <Footer/>
        </>
    );
};