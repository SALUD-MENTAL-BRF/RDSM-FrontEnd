import React from "react";
import { OptionsPatient } from "../components/main/patient/OptionsPatient";
import { Header } from "../components/headers/Header";
export const HomePage : React.FC = () => {
    return(
        <>  
            <Header/>
            <OptionsPatient/>
        </>
    );
};