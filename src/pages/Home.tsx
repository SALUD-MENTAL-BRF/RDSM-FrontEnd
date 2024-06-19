import React from "react";
import { Options } from "../components/mains/patient/OptionsPatient";
import { Header } from "../components/headers/Header";
export const Home : React.FC = () => {
    return(
        <>  
            <Header/>
            <Options/>
        </>
    );
};